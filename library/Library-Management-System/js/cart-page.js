// Cart Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateCartCount();
    displayCart();
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});

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
