//Declaration stuff
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();
const db = require('./database/connections');
const recipesRouter = require('./routes/recipes');

const app = express();


// 1. View Engine
app.set('view engine', 'ejs');


// 2. Essential Static Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/**
Route Stuff
*/

//Suggested for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 3. API Routes
app.use('/api', recipesRouter);


// 4. Page Routes
app.get('/', (req, res) => {
    console.log('Redirecting to /home');
    res.redirect('/home');
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


// 5. Static files middleware LAST (Claude saved me on this after hours of debugging)
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;