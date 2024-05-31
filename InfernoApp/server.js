const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // or 'mysql2' if you are using mysql2
const { OAuth2Client } = require('google-auth-library');
const app = express();
const port = 3000; // Choose a port different from your MySQL port

const client = new OAuth2Client('274956882933-mlfraac6hed4vsn4pitt3vpndkd80k5p.apps.googleusercontent.com'); // Replace with your Google OAuth client ID

const db = mysql.createConnection({
    host: 'localhost', // or the IP address of your server
    user: 'root', // Your MySQL username
    password: '123', // Your MySQL password
    database: 'inferno' // The name of your database
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Database connected as id ' + db.threadId);
});

app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { fullName, email, password } = req.body;
    const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [fullName, email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }
        res.send({ message: 'User registered successfully' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }
        if (results.length > 0) {
            res.send({ success: true, message: 'Login successful' });
        } else {
            res.status(401).send({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.post('/google-login', async (req, res) => {
    const { idToken } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: '274956882933-mlfraac6hed4vsn4pitt3vpndkd80k5p.apps.googleusercontent.com', // Specify your Google OAuth client ID
        });
        const payload = ticket.getPayload();
        const email = payload.email;

        // Check if the user already exists in the database
        const query = 'SELECT * FROM user WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                res.status(500).send({ error: 'Database query failed' });
                return;
            }
            if (results.length > 0) {
                res.send({ success: true, message: 'Login successful' });
            } else {
                // Register the user if not already in the database
                const newUserQuery = 'INSERT INTO user (email) VALUES (?)';
                db.query(newUserQuery, [email], (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err.stack);
                        res.status(500).send({ error: 'Database query failed' });
                        return;
                    }
                    res.send({ success: true, message: 'User registered and login successful' });
                });
            }
        });
    } catch (error) {
        console.error('Error verifying Google ID token:', error);
        res.status(401).send({ success: false, message: 'Invalid ID token' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
