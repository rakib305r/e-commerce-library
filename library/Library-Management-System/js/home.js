// Display featured books on home page
function displayFeaturedBooks() {
    const featuredContainer = document.getElementById('featuredBooks');
    if (!featuredContainer) return;

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const featuredBooks = books.slice(0, 4); // Show first 4 books as featured

    featuredContainer.innerHTML = '';

    featuredBooks.forEach(book => {
        const bookCard = createBookCard(book);
        featuredContainer.appendChild(bookCard);
    });
}

// Display best sellers on home page
function displayBestSellers() {
    const bestSellersContainer = document.getElementById('bestSellers');
    if (!bestSellersContainer) return;

    const books = JSON.parse(localStorage.getItem('books')) || [];
    // Sort by rating and take top 4
    const bestSellers = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

    bestSellersContainer.innerHTML = '';

    bestSellers.forEach(book => {
        const bookCard = createBookCard(book);
        bestSellersContainer.appendChild(bookCard);
    });
}

// Display new arrivals on home page
function displayNewArrivals() {
    const newArrivalsContainer = document.getElementById('newArrivals');
    if (!newArrivalsContainer) return;

    const books = JSON.parse(localStorage.getItem('books')) || [];
    // Take last 4 books as new arrivals
    const newArrivals = books.slice(-4).reverse();

    newArrivalsContainer.innerHTML = '';

    newArrivals.forEach(book => {
        const bookCard = createBookCard(book);
        newArrivalsContainer.appendChild(bookCard);
    });
}

// Create book card element
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

// Filter by category and redirect to books page
function filterByCategory(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'books.html';
}

// View book details
function viewBookDetails(bookId) {
    localStorage.setItem('selectedBookId', bookId);
    window.location.href = 'book-details.html';
}

// Check user authentication and update navigation
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

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We will send updates to ' + email);
        newsletterForm.reset();
    });
}

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Navbar search functionality
const navSearchInput = document.getElementById('navSearchInput');
const navSearchBtn = document.querySelector('.nav-search-btn');

if (navSearchInput && navSearchBtn) {
    navSearchBtn.addEventListener('click', () => {
        const searchTerm = navSearchInput.value.trim();
        if (searchTerm) {
            window.location.href = `books.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });

    navSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = navSearchInput.value.trim();
            if (searchTerm) {
                window.location.href = `books.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    });
}

// Initialize home page
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedBooks();
    displayBestSellers();
    displayNewArrivals();
    checkAuth();
    updateCartCount();
    revealOnScroll();
});
