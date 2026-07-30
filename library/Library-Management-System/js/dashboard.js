// Dashboard Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display username
    const username = document.getElementById('username');
    if (username) {
        username.textContent = currentUser.name;
    }

    // Load dashboard stats
    loadDashboardStats();
    updateCartCount();
    checkAuth();

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});

// Load dashboard statistics
function loadDashboardStats() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const totalBooks = document.getElementById('totalBooks');
    const availableBooks = document.getElementById('availableBooks');
    const orderCount = document.getElementById('orderCount');

    if (totalBooks) {
        totalBooks.textContent = books.length;
    }

    if (availableBooks) {
        const available = books.filter(book => book.availability === 'In Stock').length;
        availableBooks.textContent = available;
    }

    if (orderCount) {
        orderCount.textContent = orders.length;
    }
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
