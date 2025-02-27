CREATE database recipelist;
USE recipelist;

CREATE TABLE ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    info TEXT
);

CREATE TABLE recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    mainprotein_id INT NOT NULL, -- to filter by main protein
    FOREIGN KEY (mainprotein_id) REFERENCES ingredient(id)
);