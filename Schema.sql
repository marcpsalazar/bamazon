USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skateboard", "sports", 49.99, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("An Albatross", "wildlife", 299.99, 5 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Used Socks", "clothing", 5.99, 13 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana Peel", "compost", 1.99, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Statue of Liberty", "garden", 20200549.99, 1 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("My brother-in-law", "family", .99, 1 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Five Golden Rings (set)", "jewelry", 399.99, 12 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leaky Basketball", "sports", 2.99, 2 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blossom-Themed Fanny Pack", "clothing", 19.99, 6 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Golden Tooth", "jewelry", 199.99, 3 );
