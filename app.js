const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change this to your MySQL username
  password: '', // Change this to your MySQL password
  database: 'users',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle signup requests
app.post('/api/signup', (req, res) => {
  const { name, email } = req.body;

  // Insert data into MySQL database
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, results, fields) => {
    if (error) {
      console.error('Error inserting data into MySQL:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
      return;
    }

    console.log('Data inserted into MySQL:', results);
    res.json({ message: 'Signup successful!' });
  });
});

// Route for serving demo.html
app.get('/balloon', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'balloon.html'));
});

// Route for serving demo.html
// app.get('/baloon', (req, res) => {
//   res.sendFile(path.join(__dirname, 'view', 'baloon.html'));
// });

// Route for serving form.html
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
