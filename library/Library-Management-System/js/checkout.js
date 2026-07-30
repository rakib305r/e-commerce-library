// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Please login to checkout');
        window.location.href = 'index.html';
        return;
    }

    // Pre-fill user information
    document.getElementById('fullName').value = currentUser.name || '';
    document.getElementById('email').value = currentUser.email || '';

    // Load checkout items
    loadCheckoutItems();
    loadCheckoutSummary();
    updateCartCount();
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});

// Load checkout items
function loadCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        window.location.href = 'cart.html';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'checkout-item';
        cartItem.innerHTML = `
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/80x120?text=No+Image'">
            </div>
            <div class="checkout-item-details">
                <h4>${item.title}</h4>
                <p>by ${item.author}</p>
                <p>Qty: ${item.quantity}</p>
            </div>
            <div class="checkout-item-price">
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        container.appendChild(cartItem);
    });
}

// Load checkout summary
function loadCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!container) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    container.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (8%):</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

// Place order
function placeOrder() {
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentForm = document.getElementById('paymentForm');

    // Validate forms
    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    if (!paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        return;
    }

    // Get form data
    const orderData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zipCode: document.getElementById('zipCode').value,
        country: document.getElementById('country').value,
        phone: document.getElementById('phone').value,
        cardNumber: document.getElementById('cardNumber').value,
        expiryDate: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value,
        items: JSON.parse(localStorage.getItem('cart')) || [],
        total: calculateTotal(),
        orderDate: new Date().toISOString(),
        orderId: 'ORD-' + Date.now()
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Show success message
    alert(`Order placed successfully!\nOrder ID: ${orderData.orderId}\nThank you for your purchase!`);

    // Redirect to order confirmation
    window.location.href = 'order-confirmation.html';
}

// Calculate total
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
}
