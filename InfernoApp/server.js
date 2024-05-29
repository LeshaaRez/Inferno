const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // or 'mysql2' if you are using mysql2

const app = express();
const port = 3000; // Choose a port different from your MySQL port

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
