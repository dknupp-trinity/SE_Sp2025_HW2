const express = require('express');
const router = express.Router();
const connection = require('../database/connections');



// Get all recipes
router.get('/recipes', (req, res) => {
    const query = 'SELECT * FROM recipes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Get ingredients for the dropdown - assisted by Claude
router.get('/ingredients', (req, res) => {
    const sql = 'SELECT name FROM ingredients';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching ingredients:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const ingredients = results.map(row => row.name);
        res.json({ ingredients });
    });
});

//FIXME Submit - 2 versions?


router.post('/recipes', (req, res) => {
    const { name, description, instructions, mainprotein_id } = req.body;
    const query = 'INSERT INTO recipe (name, description, instructions, mainprotein_id) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, description, instructions, mainprotein_id], (err, result) => {
        if (err) {
            console.error('Error adding recipe:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Handle recipe submission
router.post('/submit_recipe', (req, res) => {
    const { recipe_name, recipe_info, instructions, ingredients } = req.body;

    // First insert the recipe
    const recipeSql = 'INSERT INTO recipes (name, description, instructions) VALUES (?, ?, ?)';
    connection.query(recipeSql, [recipe_name, recipe_info, instructions], (err, recipeResult) => {
        if (err) {
            console.error('Error inserting recipe:', err);
            res.status(500).json({ error: 'Error creating recipe' });
            return;
        }

        const recipeId = recipeResult.insertId;

        // If no ingredients were selected, we're done
        if (!ingredients || ingredients.length === 0) {
            res.status(201).json({ message: 'Recipe created successfully' });
            return;
        }

        // Get ingredient IDs for the selected ingredient names
        const getIngredientIds = 'SELECT id FROM ingredients WHERE name IN (?)';
        connection.query(getIngredientIds, [ingredients], (err, ingredientResults) => {
            if (err) {
                console.error('Error getting ingredient ids:', err);
                res.status(500).json({ error: 'Error processing ingredients' });
                return;
            }

            // Create the recipe-ingredient relationships
            const recipeIngredientValues = ingredientResults.map(ingredient => [recipeId, ingredient.id]);
            const insertRelationsSql = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ?';
            
            connection.query(insertRelationsSql, [recipeIngredientValues], (err) => {
                if (err) {
                    console.error('Error linking ingredients:', err);
                    res.status(500).json({ error: 'Error linking ingredients' });
                    return;
                }

                res.status(201).json({ message: 'Recipe created successfully' });
            });
        });
    });
});

module.exports = router;
