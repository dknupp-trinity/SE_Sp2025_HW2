document.addEventListener('DOMContentLoaded', function() {
    let existingIngredients = [];
    const addIngredientButton = document.getElementById('add-ingredient');
    const ingredientContainer = document.getElementById('ingredient-container');
    const form = document.getElementById('recipe-form');
    const mainProteinSelect = document.getElementById('main-protein');

    // Fetch possible ingredients from database
    fetch('/api/ingredients')
        .then(response => response.json())
        .then(data => {
            existingIngredients = data.ingredients;
            console.log('Fetched ingredients:', existingIngredients); // Debug log

            populateMainProteinOptions(); // Populate the main protein dropdown
        })
        .catch(error => console.error('Error fetching ingredients:', error));

    function populateMainProteinOptions() {
        const options = existingIngredients.map(ingredient => 
            `<option value="${ingredient}">${ingredient}</option>`
        ).join('');
        mainProteinSelect.innerHTML += options;
    }

    function createIngredientAdd() {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient-add';

        const ingredientOptions = existingIngredients.map(ingredient => 
            `<option value="${ingredient}">${ingredient}</option>`
        ).join('');

        ingredientDiv.innerHTML = `
            <label>Ingredient:</label>
            <select name="ingredients[]" class="ingredient-select">
                <option value="">Select an ingredient...</option>
                ${ingredientOptions}
            </select>
            <button type="button" class="remove-ingredient" onclick="this.parentElement.remove()">Remove</button>
            <br><br>
        `;

        ingredientContainer.appendChild(ingredientDiv);
    }

    addIngredientButton.addEventListener('click', createIngredientAdd);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const mainProtein = formData.get('main_protein');
        const ingredients = Array.from(formData.getAll('ingredients[]')).filter(ing => ing !== '');

        // Gather recipe details
        const recipeData = {
            recipe_name: formData.get('recipe_name'),
            recipe_info: formData.get('recipe_info'),
            instructions: formData.get('instructions'),
            main_protein: mainProtein,
            ingredients: ingredients
        };

        console.log('Collected recipe data:', recipeData); // Debug log

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