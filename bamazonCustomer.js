var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  connection.query(
    "SELECT item_id, product_name, price FROM products",
    function(err, results) {
    if (err) throw err;
      // console.log(results);
        for (var i = 0; i < results.length; i++) {
          console.log("Item ID: " + results[i].item_id + " Product: " + results[i].product_name + " Price: " + results[i].price);

        }

    inquirer
      .prompt([
      {
        name: "choice",
        type: "input",
        message: "Welcome to Bamazon! Enter the Item Id of the product you wish to purchase."
      },
      {
        name: "amount",
        type: "input",
        message: "How many would you like to buy?"
      }
    ])
    .then(function(inquirerResponse) {

      // console.log(inquirerResponse);

      connection.query("SELECT stock_quantity FROM products WHERE ?", [
          {
            item_id: inquirerResponse.choice
          }
        ]
      ,function(err, rows) {
             if (err) throw err;
             // console.log(rows);
             // console.log(inquirerResponse.amount);
             var userAmt = rows[0].stock_quantity;
             // console.log(userAmt);

             if (userAmt >= inquirerResponse.amount) {
               console.log("Congratulations! Your item has been purchased! Unfortunately this has been a scam and your money is now ours. Hahahahahahaha! Maybe it'll work next time?");
            //
            console.log("Starting stock: " + userAmt)
              var update = (userAmt - inquirerResponse.amount);
            //
               connection.query(
                 "UPDATE products SET ? WHERE ?",
                 [
                   {
                     stock_quantity: update
                   },
                   {
                     item_id: inquirerResponse.choice
                   }
                 ],
                 function(error) {
                   if (error) throw err;
                  console.log("New stock: " + update);
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        message: "Try again?",
                        choices: ["YES", "NO"],
                        name: "again"
                      }
                    ])
                    .then(function(inquirerResponse2) {
                      if (inquirerResponse2.again === "YES") {
                        start();
                      }
                      else {
                        console.log("Goodbye!");
                        connection.end();
                      }
                    })
                  // start();
                 }
               );
            }

        else {
          console.log("Sorry! You're either too late or too greedy. You're asking for more of that item than we have.");

          inquirer
            .prompt([
              {
                type: "list",
                message: "Try again?",
                choices: ["YES", "NO"],
                name: "again"
              }
            ])
            .then(function(inquirerResponse3) {
              if (inquirerResponse3.again === "YES") {
                start();
              }
              else {
                console.log("Goodbye!");
                connection.end();
              }
            })
          // start();
        }
      })
      });
  });
}
