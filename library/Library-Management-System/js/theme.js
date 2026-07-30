// Dark Theme Management
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggle) {
            themeToggle.textContent = '🌙';
        }
    }
}

// Toggle theme function
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    } else {
        localStorage.setItem('theme', 'light');
        if (themeToggle) {
            themeToggle.textContent = '🌙';
        }
    }
}

// Initialize theme on page load
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme when DOM is ready
document.addEventListener('DOMContentLoaded', initTheme);
