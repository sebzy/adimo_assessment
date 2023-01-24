

var file_system         = require('fs');
// var request    = require('request');
var cheerio    = require('cheerio');

var htmlString = file_system.readFileSync('index.html').toString();
var $          = cheerio.load(htmlString);


// Define product and cheese store objectives
var products = new Object();
const cheese_store = new Object();

// Define sum which will later on be used to calculate the average
let sum = 0;


// function to convert string to number for calculations
function convert(string) {
    string = Number(string.replace(/[^0-9\.-]+/g,""));
    return string
}





// getting the div elements to extract data
$('div.item').each(function(i, element) {

// this if statement is used to calcuate the discount if any else 0 discount
if (convert($(this).children("span.oldPrice").text().trim()) > convert($(this).children("span.price").text().trim()) ){
    var disc = convert($(this).children("span.oldPrice").text().trim()) - convert($(this).children("span.price").text().trim())
   
}else{
    disc = 0;
}


// Adding the product object properties and values as defined in the question
products[i]= { "title" : $(this).children('h1').text().trim(), //title
            "image url" : $(this).children('img').attr('src'), //image url
            price : convert($(this).children("span.price").text().trim()), //current price
            discount : disc //discount
        }
      
// this code snippet below is used to increment and get the sum of the price variable
// the convert function is applied to convert it to number
    var  price = convert($(this).children("span.price").text().trim());
    sum +=price;

});

// console.log(sum);

// The function below computes the average price of all product current price(new after discount if any)
function averagePrice() {
    var avg = sum/cheese_store["total number of items"];
    return avg
   }
//   console.log(averagePrice());

// Adding products object as child to cheese_store object
cheese_store["products"] = products;
// Adding total number of items to the object using .length
cheese_store["total number of items"] = Object.keys(products).length;
// Adding average price of all items to cheese store object using the average price function
cheese_store["average price of all items"] = averagePrice();

console.log(cheese_store);

// Saving the cheese_store object to json file
 file_system.writeFile('cheese_store.json', JSON.stringify(cheese_store), (error) => {
    if (error) throw error;
  });


