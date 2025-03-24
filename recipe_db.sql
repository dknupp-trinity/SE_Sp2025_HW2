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
VALUES ('Grilled Lemon Herb Salmon', 'A grilled salmon dish with a zesty lemon herb marinade.', '1. Preheat grill to medium-high heat. 2. Mix all your mixables. 3. Marinate salmon in mixture. 4. Grill salmon for 4-5 minutes per side, or until cooked through. 5. Serve.', 'Fish');


-- Insert ingredients
INSERT IGNORE INTO ingredients (name, description) 
VALUES ('Salmon', 'Fresh salmon fillets'), 
       ('Lemon Juice', 'Freshly squeezed (or not) lemon juice'), 
       ('Olive Oil', 'Extra virgin olive oil - the virginer, the betterer'), 
       ('Garlic', 'Minced garlic cloves.'), 
       ('Parsley', 'Freshly chopped parsley for garnish.');


-- Set recipe ID
SET @recipe_id = (SELECT id FROM recipes WHERE name = 'Grilled Lemon Herb Salmon');

-- Map recipe ID to ID of ingredient name
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
VALUES (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Salmon')),
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
       ('Chicken', 'Boneless, skinless chicken breasts.'), 
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
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Chicken')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Butter')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Garlic')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Heavy Cream')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Parmesan Cheese')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Salt')), 
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Black Pepper')), 
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Parsley')); 


-- Insert Recipe 3 --------------------------------------------------------------------

INSERT INTO recipes (name, description, instructions, main_protein) 
VALUES ('Tuna Sashimi', 'Raw tuna slices with soy sauce and wasabi.', '1. slice tuna like a master sushi chef. 2. place soy sauce on the side. 3. Place wasabi on the side.', 'Fish');

INSERT IGNORE INTO ingredients (name, description) 
VALUES ('Tuna', 'Very big fish, popular in Japan'), 
       ('Soy Sauce', 'Sauce made from soy'), 
       ('Wasabi', 'Makes you wonder how green can be so hot');

SET @recipe_id = (SELECT id FROM recipes WHERE name = 'Tuna Sashimi');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
VALUES (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Tuna')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Soy Sauce')), 
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Wasabi'));
       
       
       
-- Insert Recipe 4 --------------------------------------------------------------------

INSERT INTO recipes (name, description, instructions, main_protein) 
VALUES ('Beef Tacos', 'Ground beef in a taco shell with taco seasoning.', '1. Grind beef. 2. Stir in taco seasoning. 3. Cook beef until desired doneness. 4. Plop it in a taco shell. 5. Top with shredded cheese', 'Beef');

INSERT IGNORE INTO ingredients (name, description) 
VALUES ('Beef', 'Chef vocabulary for Cow'), 
       ('Taco Shell', 'Bought fresh from the bread aisle'), 
       ('Taco Seasoning', 'Mix of mild spices'),
       ('Shredded Cheese', 'Finely shredded cheese');

SET @recipe_id = (SELECT id FROM recipes WHERE name = 'Beef Tacos');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
VALUES (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Beef')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Taco Shell')),
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Taco Seasoning')), 
       (@recipe_id, (SELECT id FROM ingredients WHERE name = 'Shredded Cheese'));