// Books Page Functionality
let currentPage = 1;
let booksPerPage = 8;
let filteredBooks = [];

// Initialize books page
document.addEventListener('DOMContentLoaded', () => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    filteredBooks = books;
    
    // Check for selected category from home page
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
        document.getElementById('categorySelect').value = selectedCategory;
        filteredBooks = filterCategory(selectedCategory);
        localStorage.removeItem('selectedCategory');
    }
    
    displayBooks(filteredBooks);
    checkAuth();
    updateCartCount();
    
    // Event listeners
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('categorySelect').addEventListener('change', handleCategoryFilter);
    document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changePage(1));
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});

// Display books in card format
function displayBooks(books) {
    const container = document.getElementById('bookContainer');
    const bookCount = document.getElementById('bookCount');
    
    if (!container) return;
    
    // Update book count
    if (bookCount) {
        bookCount.textContent = `${books.length} books found`;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(books.length / booksPerPage);
    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const pageBooks = books.slice(start, end);
    
    container.innerHTML = '';
    
    if (pageBooks.length === 0) {
        container.innerHTML = `
            <div class="no-books">
                <h2>No books found</h2>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    pageBooks.forEach(book => {
        const card = createBookCard(book);
        container.appendChild(card);
    });
    
    // Update pagination
    updatePagination(totalPages);
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

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const books = JSON.parse(localStorage.getItem('books')) || [];
    
    filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    displayBooks(filteredBooks);
}

// Handle category filter
function handleCategoryFilter(e) {
    const category = e.target.value;
    const books = JSON.parse(localStorage.getItem('books')) || [];
    
    if (category === 'all') {
        filteredBooks = books;
    } else {
        filteredBooks = books.filter(book => book.category === category);
    }
    
    currentPage = 1;
    displayBooks(filteredBooks);
}

// Filter category function (for home page)
function filterCategory(category) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    if (category === 'all') {
        return books;
    }
    return books.filter(book => book.category === category);
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayBooks(filteredBooks);
    }
}

// Update pagination controls
function updatePagination(totalPages) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumber = document.getElementById('pageNumber');
    
    if (pageNumber) {
        pageNumber.textContent = currentPage;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
}

// View book details
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
