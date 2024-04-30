"use strict";

// const - constant (immutable)
// let - variable (mutable)
// require() - import
// console.log() - print

const readline = require('readline');
const process = require('process');

let walletAmount = 21.5;
let cart = [];

// (Almost all) JavaScript types:
// - number (const a = 1;)
// - string (const a = 'abc';)
// - boolean (const a = true;)
// - object (const a = { name: 'abc', age: 1 };)
// - array (const a = [1, 2, 3];)

let items = [
    {
        name: 'apple',
        price: 1.99,
        amount: 5,
    },
    {
        name: 'banana',
        price: 0.99,
        amount: 3,
    },
    {
        name: 'orange',
        price: 3.99,
        amount: 5,
    },
    {
        name: 'pineapple',
        price: 1.49,
        amount: 15,
    },
    {
        name: 'blueberry',
        price: 0.49,
        amount: 25,
    },
];

//add to cart
function addToCart(itemName, amount) {
    const index = items.findIndex((item) => item.name === itemName);
    if (index === -1) {
        console.log(`${itemName} is not available.`);
        return;
    }

    const availableAmount = items[index].amount;

    if (amount > availableAmount) {
        console.log(`Not enough ${itemName} available.`);
        return;
    }

    const totalPrice = items[index].price * amount;

    if (totalPrice > walletAmount) {
        console.log('Not enough money');
        return;
    }

    const itemToAdd = Object.assign({}, items[index]);
    itemToAdd.amount = amount; 

    for (let i = 0; i < amount; i++) {
        cart.push(itemToAdd); 
    }

    items[index].amount -= amount;

    console.log(`${amount} ${itemName}(s) added to cart with total price ${totalPrice.toFixed(2)}.`);
    console.log(items);
}





//buy
function buy() {
    if (cart.length === 0) {
        console.log('Cart is empty');
        return;
    }

    let totalCost = 0;
    for (const item of cart) {
        const index = items.findIndex((itemInList) => itemInList.name === item.name);
        if (index !== -1) {
            totalCost += items[index].price; 
            items[index].amount--;
            if (items[index].amount === 0) {
                items.splice(index, 1); 
            }
        }
    }

    if (totalCost > walletAmount) {
        console.log('Not enough money');
        return;
    }

    walletAmount -= totalCost;

    console.log(`Items bought successfully.`);
    console.log(`Wallet amount after purchase: ${walletAmount.toFixed(2)}`);

    cart = [];
}


//view wallet amount
function viewWalletAmount() {
    console.log(`Current wallet amount: ${walletAmount.toFixed(2)}`);
}

//view cart items
function viewCartItems() {
    if (cart.length === 0) {
        console.log('Cart is empty');
        return;
    }

    console.log('Items in cart:');
    cart.forEach((item) => {
        console.log(`${item.name} - $${item.price}`);
    });
}


//remove from cart
function removeFromCart(itemName, amountToRemove) {
    let removedItems = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === itemName) {
            const remainingItems = cart[i].amount - removedItems;
            if (amountToRemove <= remainingItems) {
                removedItems += amountToRemove;
                cart[i].amount -= amountToRemove;
                const index = items.findIndex((item) => item.name === itemName);
                if (index !== -1) {
                    items[index].amount += amountToRemove; // Vraćanje količine u items
                }
                console.log(`Removed ${amountToRemove} ${itemName}(s) from the cart.`);
                return amountToRemove; // Vraćanje uklonjenog broja stavki
            } else {
                removedItems += remainingItems;
                amountToRemove -= remainingItems;
                cart.splice(i, 1);
                const index = items.findIndex((item) => item.name === itemName);
                if (index !== -1) {
                    items[index].amount += remainingItems; // Vraćanje količine u items
                }
                console.log(`Removed all ${remainingItems} ${itemName}(s) from the cart.`);
            }
        }
    }
    console.log(`Not enough ${itemName} in the cart.`);
}




//help
function help() {
    console.log("Available commands:");
    console.log("- add <item> <amount>: Add items to cart");
    console.log("- buy: Buy items in the cart");
    console.log("- cart: View items in the cart");
    console.log("- remove: Remove items from the cart");
    console.log("- help: Display available commands");
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Store");
rl.prompt();

// (argument) => { body } - arrow function
// higher-order function, equivalent of delegate in C#
// rl.on('line', (line) => { ... }) registers a function to 
// get called when the user enters a line
rl.on('line', (line) => {
    const split = line.split(' '); // 'buy Apple' => ['buy', 'Apple']
    const command = split[0];
    const args = split.slice(1); // Rest of the array. (['Apple'])
    console.log(`Command: ${command}`);
    console.log(`Args: ${args}`);

    switch (command) {
        case 'add':
            addToCart(args[0], parseInt(args[1]));
            break;
        case 'buy':
            buy();
            break;
        case 'wallet':
            viewWalletAmount();
            break;
        case 'cart':
            viewCartItems();
            break;
        case 'help':
            help();
            break;
        case 'remove':
            removeFromCart(args[0], parseInt(args[1]));
            break;
        default:
            console.log(`Unknown command: ${command}`);
    }

    rl.prompt();
}).on('close', () => {
    console.log('Exit');
    process.exit(0);
});