// Book Details Page Functionality
let currentBook = null;
let selectedQuantity = 1;

// Initialize book details page
document.addEventListener('DOMContentLoaded', () => {
    loadBookDetails();
    checkAuth();
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

// Load book details
function loadBookDetails() {
    const bookId = parseInt(localStorage.getItem('selectedBookId'));
    if (!bookId) {
        window.location.href = 'books.html';
        return;
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    currentBook = books.find(book => book.id === bookId);

    if (!currentBook) {
        alert('Book not found');
        window.location.href = 'books.html';
        return;
    }

    // Populate book details
    document.getElementById('bookImage').src = currentBook.image;
    document.getElementById('bookTitle').textContent = currentBook.title;
    document.getElementById('bookAuthor').textContent = `by ${currentBook.author}`;
    document.getElementById('bookCategory').textContent = currentBook.category;
    document.getElementById('bookRating').textContent = `⭐ ${currentBook.rating}`;
    document.getElementById('bookAvailability').textContent = currentBook.availability;
    document.getElementById('bookQuantity').textContent = currentBook.quantity;
    document.getElementById('bookPrice').textContent = `$${currentBook.price.toFixed(2)}`;

    // Update availability styling
    const availabilityEl = document.getElementById('bookAvailability');
    if (currentBook.availability === 'In Stock') {
        availabilityEl.classList.add('in-stock');
    } else {
        availabilityEl.classList.add('out-stock');
    }

    // Load related books
    loadRelatedBooks(currentBook.category, currentBook.id);
}

// Load related books
function loadRelatedBooks(category, excludeId) {
    const container = document.getElementById('relatedBooks');
    if (!container) return;

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const relatedBooks = books
        .filter(book => book.category === category && book.id !== excludeId)
        .slice(0, 4);

    container.innerHTML = '';

    if (relatedBooks.length === 0) {
        container.innerHTML = '<p class="no-related">No related books found</p>';
        return;
    }

    relatedBooks.forEach(book => {
        const card = createBookCard(book);
        container.appendChild(card);
    });
}

// Create book card
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
        <div class="book-image">
            <img src="${book.image}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/200x300?text=No+Image'">
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-meta">
                <span class="book-category">${book.category}</span>
                <span class="book-rating">⭐ ${book.rating}</span>
            </div>
            <div class="book-price">$${book.price.toFixed(2)}</div>
            <div class="book-availability ${book.availability === 'In Stock' ? 'in-stock' : 'out-stock'}">
                ${book.availability}
            </div>
            <div class="book-actions">
                <button onclick="viewBookDetails(${book.id})" class="btn-view">View Details</button>
                <button onclick="addToCart(${book.id})" class="btn-cart">Add to Cart</button>
            </div>
        </div>
    `;
    return card;
}

// Change quantity
function changeQuantity(change) {
    selectedQuantity += change;
    if (selectedQuantity < 1) selectedQuantity = 1;
    if (selectedQuantity > currentBook.quantity) selectedQuantity = currentBook.quantity;
    document.getElementById('selectedQuantity').textContent = selectedQuantity;
}

// Add to cart from details page
function addToCartFromDetails() {
    if (!currentBook) return;

    if (currentBook.availability !== 'In Stock') {
        alert('This book is currently out of stock');
        return;
    }

    // Add selected quantity to cart
    for (let i = 0; i < selectedQuantity; i++) {
        addToCart(currentBook.id);
    }

    // Reset quantity
    selectedQuantity = 1;
    document.getElementById('selectedQuantity').textContent = selectedQuantity;
}

// Buy now
function buyNow() {
    addToCartFromDetails();
    window.location.href = 'cart.html';
}

// View book details (for related books)
function viewBookDetails(bookId) {
    localStorage.setItem('selectedBookId', bookId);
    window.location.href = 'book-details.html';
}

// Check authentication
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userNav = document.getElementById('userNav');
    const authNav = document.getElementById('authNav');

    if (currentUser) {
        if (userNav) userNav.style.display = 'flex';
        if (authNav) authNav.style.display = 'none';
    } else {
        if (userNav) userNav.style.display = 'none';
        if (authNav) authNav.style.display = 'flex';
    }
}
