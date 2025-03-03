CREATE database recipe_db;
USE recipe_db;


CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    main_protein VARCHAR(255)
);


CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
-- to prevent duplicate ingredient names; should preserve original description
ALTER TABLE ingredients
ADD CONSTRAINT unique_ingredient_name UNIQUE (name);


CREATE TABLE recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);


-- Insert Recipe 1

INSERT INTO recipes (name, description, instructions, main_protein) 
VALUES ('Grilled Lemon Herb Salmon', 'A grilled salmon dish with a zesty lemon herb marinade.', '1. Preheat grill to medium-high heat. 2. In a bowl, mix lemon juice, olive oil, garlic, and herbs. 3. Marinate salmon fillets in the mixture for at least 30 minutes. 4. Grill salmon for 4-5 minutes per side, or until cooked through. 5. Serve with your favorite side dishes.', 'Salmon');


-- Insert ingredients
INSERT IGNORE INTO ingredients (name, description) 
VALUES ('Salmon Fillet', 'Fresh salmon fillets'), 
       ('Lemon Juice', 'Freshly squeezed (or not) lemon juice'), 
       ('Olive Oil', 'Extra virgin olive oil - the virginer, the betterer'), 
       ('Garlic', 'Minced garlic cloves.'), 
       ('Parsley', 'Freshly chopped parsley for garnish.');


-- Set recipe ID
SET @recipe_id = (SELECT id FROM recipes WHERE name = 'Grilled Lemon Herb Salmon');

-- Map recipe ID to ID of ingredient name
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
VALUES (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Salmon Fillet')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Lemon Juice')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Olive Oil')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Garlic')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Parsley'));



-- Insert Recipe 2 --------------------------------------------------------------------

-- Generated mostly by Copilot to overlap some ingredients
INSERT INTO recipes (name, description, instructions, main_protein) 
VALUES ('Chicken Alfredo', 'A creamy and delicious pasta dish with grilled chicken and a rich Alfredo sauce.', '1. Cook fettuccine according to package instructions until al dente. 2. In a large skillet, heat olive oil over medium heat. 3. Season chicken breasts with salt and pepper and cook until golden brown and cooked through, about 6-7 minutes per side. Remove from skillet and slice into strips. 4. In the same skillet, melt butter and sauté minced garlic until fragrant. 5. Add heavy cream and bring to a simmer. 6. Stir in grated Parmesan cheese until melted and smooth. 7. Add cooked fettuccine and chicken strips to the skillet, tossing to coat in the sauce. 8. Season with salt and pepper to taste. 9. Garnish with freshly chopped parsley and additional Parmesan cheese. 10. Serve immediately.', 'Chicken');

INSERT IGNORE INTO ingredients (name, description) 
VALUES ('Fettuccine', 'Long, flat pasta.'), 
       ('Olive Oil', 'Extra virgin olive oil - the virginer, the betterer'), 
       ('Chicken Breasts', 'Boneless, skinless chicken breasts.'), 
       ('Butter', 'Unsalted butter.'), 
       ('Garlic', 'Minced garlic cloves.'), 
       ('Heavy Cream', 'Rich and creamy heavy cream.'), 
       ('Parmesan Cheese', 'Grated Parmesan cheese.'), 
       ('Salt', 'Salt to taste.'), 
       ('Black Pepper', 'Freshly ground black pepper to taste.'), 
       ('Parsley', 'Freshly chopped parsley for garnish.');


SET @recipe_id = (SELECT id FROM recipes WHERE name = 'Chicken Alfredo');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
VALUES (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Fettuccine')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Olive Oil')), 
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Chicken Breasts')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Butter')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Garlic')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Heavy Cream')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Parmesan Cheese')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Salt')), 
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Black Pepper')), 
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Parsley')); 

