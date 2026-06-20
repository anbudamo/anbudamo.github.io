// Create variables for the welcome message
var greet = "Hello ";
var name = "Anbu";
var message = ", please check your order";
// Concatenate the three variables above to create the welcome message
var welcome =  greet + name + message;

// Create variables to hold details about the sign
var sign = "Skibidi";
var tiles = sign.length;
var subTotal = tiles * 5; //$5 for each tile
var shipping = 7;
var grandTotal = subTotal + shipping;

// Get the element that has an id of greeting
// Replace the content of that element with the personalized welcome message
document.querySelector('#greeting').textContent = welcome

// Get the element that has an id of userSign then update its contents
document.querySelector('#userSign').textContent = sign


// Get the element that has an id of tiles then update its contents
document.querySelector('#tiles').textContent = tiles.toString()


// Get the element that has an id of subTotal then update its contents
document.querySelector('#subTotal').textContent = '$' + subTotal.toString()


// Get the element that has an id of shipping then update its contents
document.querySelector('#shipping').textContent = '$' + shipping.toString()


// Get the element that has an id of grandTotal then update its contents
document.querySelector('#grandTotal').textContent = '$' + grandTotal.toString()
