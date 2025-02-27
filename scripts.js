document.addEventListener('DOMContentLoaded', function() {
    // Replace with actual ingredients fetched from your database
    let existingIngredients = ['Tomato', 'Cheese', 'Chicken', 'Basil', 'Garlic'];

    const addIngredientButton = document.getElementById('add-ingredient');
    const ingredientContainer = document.getElementById('ingredient-container');
    const form = document.getElementById('recipe-form');

    // Function to fetch ingredients from the server (optional)
    /*
    fetch('/get_ingredients')
        .then(response => response.json())
        .then(data => {
            existingIngredients = data.ingredients;
            createIngredientAdd(); // Initialize with one ingredient field after fetching
        })
        .catch(error => console.error('Error fetching ingredients:', error));
    */

    function createIngredientAdd() {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient-add';

        const ingredientOptions = existingIngredients.map(ingredient => 
            `<option value="${ingredient}">${ingredient}</option>`
        ).join('');

        ingredientDiv.innerHTML = `
            <label>Ingredient:</label>
            <select name="ingredients[]" required>
                ${ingredientOptions}
            </select><br><br>
        `;

        ingredientContainer.appendChild(ingredientDiv);
    }

    addIngredientButton.addEventListener('click', createIngredientAdd);
    createIngredientAdd(); // Initialize with one ingredient field

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        
        // Gather recipe details
        const recipeData = {
            name: formData.get('recipe_name'),
            info: formData.get('recipe_info'),
            instructions: formData.get('instructions'),
            ingredients: formData.getAll('ingredients[]')
        };

        console.log(recipeData);

        // Send recipeData to your server (example using fetch)
        /*
        fetch('/submit_recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Recipe submitted successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */
    });
});
