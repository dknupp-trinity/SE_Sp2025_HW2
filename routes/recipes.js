const express = require('express');
const router = express.Router();
const connection = require('../database/connections');



//getrecipe routes

//recipe names list
router.get('/recipe_names', (req, res) => {
    const sql = 'SELECT id, name FROM recipes ORDER BY name';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching recipe names:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});


//Get selected recipe and ingredients
router.get('/recipe/:id', (req, res) => {
    const recipeId = req.params.id;
    const sql = `
        SELECT r.*, GROUP_CONCAT(i.name) as ingredients
        FROM recipes r
        LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
        LEFT JOIN ingredients i ON ri.ingredient_id = i.id
        WHERE r.id = ?
        GROUP BY r.id
    `;
    
    connection.query(sql, [recipeId], (err, results) => {
        if (err) {
            console.error('Error fetching recipe:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results[0]);
    });
});






//addrecipe routes

// Get ingredients for addrecipe dropdown - assisted by Claude
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



// Route to get recipes sorted by main protein
router.get('/recipes', (req, res) => {
    const sql = `
    SELECT r.name AS recipe_name, r.description AS recipe_description, r.instructions, r.main_protein, i.name AS ingredient_name, i.description AS ingredient_description
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.id
    ORDER BY r.main_protein;
    `;

    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
