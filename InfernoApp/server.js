const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { OAuth2Client } = require('google-auth-library');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Update the path if necessary
const cors = require('cors');

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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'inferno-1a6a8.appspot.com' // Replace with your Firebase storage bucket name
});

const bucket = admin.storage().bucket();

app.use(bodyParser.json());
app.use(cors()); // Добавьте это для включения CORS

app.post('/signup', (req, res) => {
    const { fullName, email, password } = req.body;
    const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [fullName, email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }
        res.send({ message: 'User registered successfully', userId: result.insertId }); // Возвращаем userId
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT user_id FROM user WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }
        if (results.length > 0) {
            const userId = results[0].user_id;
            res.send({ success: true, userId: userId }); // Возвращаем ID пользователя
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
        const query = 'SELECT user_id FROM user WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                res.status(500).send({ error: 'Database query failed' });
                return;
            }
            if (results.length > 0) {
                res.send({ success: true, userId: results[0].user_id });
            } else {
                // Register the user if not already in the database
                const newUserQuery = 'INSERT INTO user (email) VALUES (?)';
                db.query(newUserQuery, [email], (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err.stack);
                        res.status(500).send({ error: 'Database query failed' });
                        return;
                    }
                    res.send({ success: true, userId: result.insertId });
                });
            }
        });
    } catch (error) {
        console.error('Error verifying Google ID token:', error);
        res.status(401).send({ success: false, message: 'Invalid ID token' });
    }
});

app.get('/profile', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    const profileQuery = `
        SELECT 
            u.username,
            (SELECT COUNT(*) FROM userachieve WHERE user_id = ?) as achievementsCount,
            (SELECT COUNT(*) FROM result WHERE user_id = ?) as quizzesCount
        FROM user u
        WHERE u.user_id = ?
    `;

    db.query(profileQuery, [userId, userId, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send({ error: 'Profile not found' });
        }
    });
});

app.get('/quizzes', (req, res) => {
    const query = 'SELECT * FROM quiz ORDER BY currency_amount DESC LIMIT 3';
    db.query(query, async (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }

        // Add URLs to quizzes
        const quizzesWithUrls = await Promise.all(results.map(async quiz => {
            const filePath = quiz.image_url.replace('gs://inferno-1a6a8.appspot.com/', '');
            const [file] = await bucket.file(filePath).getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });
            return { ...quiz, image_url: file };
        }));

        res.send(quizzesWithUrls);
    });
});


app.get('/quiz', (req, res) => {
    const query = 'SELECT title, image_url, currency_amount AS rating FROM quiz LIMIT 5';
    db.query(query, async (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }

        // Add URLs to quizzes
        const quizzesWithUrls = await Promise.all(results.map(async quiz => {
            const filePath = quiz.image_url.replace('gs://inferno-1a6a8.appspot.com/', '');
            const [file] = await bucket.file(filePath).getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });
            return { ...quiz, image_url: file };
        }));

        console.log(quizzesWithUrls);
        res.send(quizzesWithUrls);
    });
});

app.get('/search', (req, res) => {
    const { query } = req.query;
    const searchQuery = `
        SELECT * FROM quiz 
        WHERE title LIKE ? OR description LIKE ? OR theme LIKE ?
    `;
    const queryParam = `%${query}%`;
    db.query(searchQuery, [queryParam, queryParam, queryParam], async (err, results) => {
        if (err) {
            console.error('Error executing search query:', err.stack);
            res.status(500).send({ error: 'Database search query failed' });
            return;
        }

        const quizzesWithUrls = await Promise.all(results.map(async quiz => {
            const filePath = quiz.image_url.replace('gs://inferno-1a6a8.appspot.com/', '');
            const [file] = await bucket.file(filePath).getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });
            return { ...quiz, image_url: file };
        }));

        res.send(quizzesWithUrls);
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
