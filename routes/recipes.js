const express = require('express');
const router = express.Router();
const connection = require('../database/database');

// Fetch?
router.get('/ingredients', (req, res) => {
    const sql = 'SELECT name FROM ingredients';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ ingredients: result });
    });
});

// Submit
router.post('/submit_recipe', (req, res) => {
    const { recipe_name, recipe_info, instructions, ingredients } = req.body;

    // Insert db (did not really understand this, just following apparent syntax)
    const recipeSql = 'INSERT INTO recipes (name, info, instructions) VALUES (?, ?, ?)';
    connection.query(recipeSql, [recipe_name, recipe_info, instructions], (err, result) => {
        if (err) throw err;

        const recipeId = result.insertId;
        const ingredientSql = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_name) VALUES ?';

        const ingredientData = ingredients.map(ingredient => [recipeId, ingredient]);

        connection.query(ingredientSql, [ingredientData], (err, result) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});

module.exports = router;
