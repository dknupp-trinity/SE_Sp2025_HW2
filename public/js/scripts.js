document.addEventListener('DOMContentLoaded', function() {
    let existingIngredients = [];
    const addIngredientButton = document.getElementById('add-ingredient');
    const ingredientContainer = document.getElementById('ingredient-container');
    const form = document.getElementById('recipe-form');

    // Fetch ingredients from the database
    fetch('/api/ingredients')
        .then(response => response.json())
        .then(data => {
            existingIngredients = data.ingredients;
            createFirstIngredient(); // Initialize with first ingredient field after fetching
        })
        .catch(error => console.error('Error fetching ingredients:', error));

    function createFirstIngredient() {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient-add';
    
        const ingredientOptions = existingIngredients.map(ingredient => 
            `<option value="${ingredient}">${ingredient}</option>`
        ).join('');
    
        ingredientDiv.innerHTML = `
            <label>Ingredient:</label>
            <select name="ingredients[]" required>
                <option value="">Select an ingredient...</option>
                ${ingredientOptions}
            </select><br><br>
        `;
    
        ingredientContainer.appendChild(ingredientDiv);
    }
        
    function createIngredientAdd() {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient-add';

        const ingredientOptions = existingIngredients.map(ingredient => 
            `<option value="${ingredient}">${ingredient}</option>`
        ).join('');

        ingredientDiv.innerHTML = `
            <label>Ingredient:</label>
            <select name="ingredients[]">
                <option value="">Select an ingredient...</option>
                ${ingredientOptions}
            </select><br><br>
        `;

        ingredientContainer.appendChild(ingredientDiv);
    }

    addIngredientButton.addEventListener('click', createIngredientAdd);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        
        // Gather recipe details
        const recipeData = {
            recipe_name: formData.get('recipe_name'),
            recipe_info: formData.get('recipe_info'),
            instructions: formData.get('instructions'),
            ingredients: formData.getAll('ingredients[]').filter(ing => ing !== '')
        };

        // Send to server
        fetch('/api/submit_recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Recipe submitted successfully!');
            window.location.href = '/recipelist';  // Redirect to recipe list
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error submitting recipe. Please try again.');
        });
    });
});