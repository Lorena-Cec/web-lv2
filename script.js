// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const searchInput = document.querySelector('.search-input');
const sortSelect = document.querySelector('.sort-select');

let items = [
    {
        id: 1,
        name: 'Apple',
        price: 0.99,
    },
    {
        id: 2,
        name: 'Banana',
        price: 1.99,
    },
    {
        id: 3,
        name: 'Mandarin',
        price: 1.59,
    },
    {
        id: 4,
        name: 'Kiwi',
        price: 2.59,
    },
    {
        id: 5,
        name: 'Orange',
        price: 0.99,
    },
    {
        id: 6,
        name: 'Lemon',
        price: 1.99,
    },
    {
        id: 7,
        name: 'Peach',
        price: 1.59,
    },
    {
        id: 8,
        name: 'Pear',
        price: 1.49,
    },
    {
        id: 9,
        name: 'Cherry',
        price: 0.99,
    },
    {
        id: 10,
        name: 'Watermelon',
        price: 1.99,
    },
];

let cart = [];


function updateCartTotal() {
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    cartTotal.textContent = `${total.toFixed(2)}`;
}

function displayCartItems() {
    cartItemsList.innerHTML = '';

    const cartItemsGrouped = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 0 };
        }
        acc[item.id].quantity++;
        return acc;
    }, {});

    Object.values(cartItemsGrouped).forEach((item) => {
        const totalPrice = item.price * item.quantity;
        const cartItemElement = document.createElement('li');
        cartItemElement.innerHTML = `
            <span>${item.quantity} x ${item.name}: $${totalPrice.toFixed(2)}</span>
            <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
        `;
        cartItemsList.appendChild(cartItemElement);
    });

    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(button.dataset.id);
            const indexToRemove = cart.findIndex(item => item.id === itemId);
            if (indexToRemove !== -1) { 
                cart.splice(indexToRemove, 1); 
                updateCart(); 
            }
        });
    });
}

function updateCart() {
    if (cart.length === 0) {
        cartBadge.style.display = 'none';
    } else {
        cartBadge.textContent = cart.length;
        cartBadge.style.display = 'inline-block';
    }
    updateCartTotal();
    displayCartItems(); // Pozivamo funkciju za ažuriranje prikaza košarice nakon promjene u košarici

}

// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="/images/${item.name.toLowerCase()}.avif" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);

        const addToCartButton = itemElement.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', function () {
            const itemId = parseInt(addToCartButton.dataset.id);
            const itemToAdd = items.find(item => item.id === itemId);

            if (itemToAdd) {
                cart.push(itemToAdd);
                updateCart();
            }
        });
    }
}

// Pretraga artikala
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm));
    itemsGrid.innerHTML = '';
    filteredItems.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="/images/${item.name.toLowerCase()}.avif" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);

        const addToCartButton = itemElement.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', function () {
            const itemId = parseInt(addToCartButton.dataset.id);
            const itemToAdd = items.find(item => item.id === itemId);

            if (itemToAdd) {
                cart.push(itemToAdd);
                updateCart();
            }
        });
    });
});

// Sortiranje artikala
sortSelect.addEventListener('change', function() {
    const sortBy = sortSelect.value;
    let sortedItems = [];
    if (sortBy === 'priceLowToHigh') {
        sortedItems = items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
        sortedItems = items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'nameAZ') {
        sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameZA') {
        sortedItems = items.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'default') {
        sortedItems = items.sort((a, b) => a.id - b.id);
    }
    itemsGrid.innerHTML = '';
    sortedItems.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="/images/${item.name.toLowerCase()}.avif" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);

        const addToCartButton = itemElement.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', function () {
            const itemId = parseInt(addToCartButton.dataset.id);
            const itemToAdd = items.find(item => item.id === itemId);

            if (itemToAdd) {
                cart.push(itemToAdd);
                updateCart();
            }
        });
    });
});

buyButton.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before purchasing.');
    } else {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
        toggleModal(); // Optional: Close the modal after purchase
    }
});


// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
}

// Call fillItemsGrid function when page loads
fillItemsGrid();

// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
