const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.post('/submit_recipe', (req, res) => {
    const recipe_name = req.body.recipe_name;
    const description = req.body.description;
    const ingredients = req.body.ingredients;

    const query = 'INSERT INTO recipes (recipe_name, description, ingredients) VALUES (?, ?, ?)';
    db.query(query, [recipe_name, description, ingredients], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error submitting recipe');
        } else {
            res.send('New recipe submitted successfully');
        }
    });
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/addrecipe', (req, res) => {
    res.render('addrecipe');
});

app.get('/recipelist', (req, res) => {
    res.render('recipelist');
});

app.get('/getrecipe', (req, res) => {
    res.render('getrecipe');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;