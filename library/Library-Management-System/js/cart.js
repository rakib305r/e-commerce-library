// Shopping Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Add book to cart
function addToCart(bookId) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
        alert('Book not found');
        return;
    }

    if (book.availability !== 'In Stock') {
        alert('This book is currently out of stock');
        return;
    }

    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    saveCart();
    alert('Book added to cart!');
}

// Remove book from cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    displayCart();
}

// Update quantity
function updateQuantity(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(bookId);
        } else {
            saveCart();
            displayCart();
        }
    }
}

// Calculate total price
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Display cart items
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some books to get started!</p>
                <a href="books.html" class="btn-browse">Browse Books</a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/100x150?text=No+Image'">
            </div>
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>by ${item.author}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, -1)" class="qty-btn">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="qty-btn">+</button>
            </div>
            <div class="cart-item-total">
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})" class="btn-remove">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update order summary
    const orderSummary = document.getElementById('orderSummary');
    if (orderSummary) {
        const subtotal = calculateTotal();
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + shipping;

        orderSummary.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button onclick="proceedToCheckout()" class="btn-checkout">Proceed to Checkout</button>
        `;
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to checkout');
        window.location.href = 'index.html';
        return;
    }

    window.location.href = 'checkout.html';
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCart();
});
