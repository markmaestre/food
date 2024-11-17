let cart = [];

/**
 * Displays the selected product category and hides others.
 * @param {string} category - The ID of the category to display.
 */
function showCategory(category) {
    document.querySelectorAll('.product-category').forEach(div => {
        div.style.display = 'none';
    });
    document.getElementById(category).style.display = 'block';
}

/**
 * Adds an item to the cart.
 * @param {string} name - Name of the product.
 * @param {number} price - Price of the product.
 */
function addToCart(name, price) {
    const item = cart.find(product => product.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

/**
 * Updates the cart view and calculates the total price.
 */
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        cartItems.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - ₱${item.price.toFixed(2)} x ${item.quantity} = ₱${subtotal.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });

    document.getElementById('cartTotal').innerText = `Total: ₱${total.toFixed(2)}`;
    showCartModal();
}

/**
 * Removes an item from the cart.
 * @param {string} name - Name of the product to remove.
 */
function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

/**
 * Displays the cart modal.
 */
function showCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'flex';
    }
}

/**
 * Hides the cart modal.
 */
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

/**
 * Proceeds to checkout and opens the order modal.
 */
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add items to place an order.');
        return;
    }

    // Close the cart modal
    closeCart();

    // Show the order modal
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.style.display = 'flex';
    }
}

/**
 * Confirms and places the order with customer details.
 */
function confirmOrder() {
    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (!name || !address || !phone || !paymentMethod || paymentMethod === "Select a payment method") {
        alert('Please fill in all fields and select a valid payment method.');
        return;
    }
    const orderDetails = cart.map(item => `${item.quantity} x ${item.name} @ ₱${item.price.toFixed(2)}`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (confirm(`Order Details:\n${orderDetails}\n\nTotal: ₱${total.toFixed(2)}\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nPayment Method: ${paymentMethod}\n\nPlace this order?`)) {
        alert('Your order has been placed successfully!');
        cart = [];
        updateCart();
        closeOrderModal();
    }
}

/**
 * Closes the order details input modal.
 */
function closeOrderModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.style.display = 'none';
    }
}

/**
 * Displays the order modal.
 */
function showOrderModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.style.display = 'flex';
    }
}
