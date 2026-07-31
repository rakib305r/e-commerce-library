// Force update book data with new images
localStorage.removeItem("books");

let books = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Programming",
        price: 45.99,
        rating: 4.8,
        availability: "In Stock",
        quantity: 10,
        image: "https://m.media-amazon.com/images/I/81Rnac2Fq+L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 2,
        title: "JavaScript: The Definitive Guide",
        author: "David Flanagan",
        category: "Programming",
        price: 52.99,
        rating: 4.7,
        availability: "In Stock",
        quantity: 8,
        image: "https://m.media-amazon.com/images/I/91xorHXzWbL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 3,
        title: "Python Crash Course",
        author: "Eric Matthes",
        category: "Programming",
        price: 39.99,
        rating: 4.6,
        availability: "In Stock",
        quantity: 12,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIjycKtwcn10oisyoULD4U4mqPacD8U3TTJf2MwwnXcB0gPo52Qhl4W2fA&s=10"
    },
    {
        id: 4,
        title: "Automate the Boring Stuff with Python",
        author: "Al Sweigart",
        category: "Programming",
        price: 29.99,
        rating: 4.5,
        availability: "In Stock",
        quantity: 15,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSER6Lk6JmT7oEWfgIC6qupg59efTcW1M3ClNugNqlwpDgLV0y01C2T0dk&s=10"
    },
    {
        id: 5,
        title: "C++ Primer",
        author: "Stanley B. Lippman",
        category: "Programming",
        price: 58.99,
        rating: 4.7,
        availability: "In Stock",
        quantity: 7,
        image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1347564002i/768080.jpg"
    },
    {
        id: 6,
        title: "Effective Java",
        author: "Joshua Bloch",
        category: "Programming",
        price: 54.99,
        rating: 4.9,
        availability: "In Stock",
        quantity: 9,
        image: "https://bd-live-21.slatic.net/kf/S7704f8c9a32d43bcaf7d7033b38e725ca.jpg"
    },
    {
        id: 7,
        title: "Head First Java",
        author: "Kathy Sierra",
        category: "Programming",
        price: 42.99,
        rating: 4.4,
        availability: "In Stock",
        quantity: 11,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUhn89KFZvMvjpM-8eCqTn0xgFNJWeq6TJP43p6x5xA&s=10"
    },
    {
        id: 8,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Programming",
        price: 72.99,
        rating: 4.8,
        availability: "In Stock",
        quantity: 6,
        image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1189006133i/1836935.jpg"
    },
    {
        id: 9,
        title: "Design Patterns",
        author: "Erich Gamma",
        category: "Programming",
        price: 59.99,
        rating: 4.6,
        availability: "In Stock",
        quantity: 8,
        image: "https://m.media-amazon.com/images/I/81IGFC6oFmL.jpg"
    },
    {
        id: 10,
        title: "Computer Networks",
        author: "Andrew S. Tanenbaum",
        category: "Programming",
        price: 65.99,
        rating: 4.5,
        availability: "In Stock",
        quantity: 7,
        image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1347462821i/166190.jpg"
    },
    {
        id: 11,
        title: "Machine Learning Yearning",
        author: "Andrew Ng",
        category: "Science",
        price: 55.99,
        rating: 4.7,
        availability: "In Stock",
        quantity: 5,
        image: "https://cdn.kobo.com/book-images/fe82ed0c-84df-421c-a0f4-f57f20ff1038/1200/1200/False/machine-learning-yearning-1.jpg"
    },
    {
        id: 12,
        title: "Artificial Intelligence",
        author: "Stuart Russell",
        category: "Science",
        price: 89.99,
        rating: 4.6,
        availability: "In Stock",
        quantity: 4,
        image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1385600294i/27543.jpg"
    },
    {
        id: 13,
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        category: "Programming",
        price: 68.99,
        rating: 4.5,
        availability: "In Stock",
        quantity: 5,
        image: "https://m.media-amazon.com/images/I/51dC4E2S+qL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 14,
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        category: "Science",
        price: 75.99,
        rating: 4.4,
        availability: "In Stock",
        quantity: 4,
        image: "https://m.media-amazon.com/images/I/81SwKCia7VL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 15,
        title: "Web Development with Node and Express",
        author: "Ethan Brown",
        category: "Programming",
        price: 35.99,
        rating: 4.3,
        availability: "In Stock",
        quantity: 10,
        image: "https://m.media-amazon.com/images/I/91CyIKXPZtL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 16,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Novel",
        price: 14.99,
        rating: 4.7,
        availability: "In Stock",
        quantity: 20,
        image: "https://www.bookowlsbd.com/cdn/shop/files/Book-owls_covers_2.png?v=1711660660"
    },
    {
        id: 17,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Novel",
        price: 16.99,
        rating: 4.8,
        availability: "In Stock",
        quantity: 18,
        image: "https://www.bookowlsbd.com/cdn/shop/files/27_d673dfd1-66c2-4ed0-996e-47b822f38fa5.png?v=1704026384"
    },
    {
        id: 18,
        title: "1984",
        author: "George Orwell",
        category: "Novel",
        price: 12.99,
        rating: 4.6,
        availability: "In Stock",
        quantity: 15,
        image: "https://static-01.daraz.com.bd/p/83cb389fea6e3d5df2f85d9bee2949fc.jpg"
    }
];

localStorage.setItem("books", JSON.stringify(books));

// Add Book
function addBook(title, author, category, quantity, price, rating, availability, image) {
    books.push({
        id: Date.now(),
        title,
        author,
        category,
        quantity: Number(quantity),
        price: Number(price),
        rating: Number(rating),
        availability,
        image: image || "https://via.placeholder.com/200x300?text=No+Image"
    });
    saveBooks();
}

// Delete Book
function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    saveBooks();
}

// Edit Book
function editBook(id, data) {
    const book = books.find(b => b.id === id);
    if (book) {
        book.title = data.title;
        book.author = data.author;
        book.category = data.category;
        book.quantity = Number(data.quantity);
        book.price = Number(data.price);
        book.rating = Number(data.rating);
        book.availability = data.availability;
        book.image = data.image;
    }
    saveBooks();
}

// Search
function searchBooks(value) {
    return books.filter(book =>
        book.title.toLowerCase().includes(value.toLowerCase())
    );
}

// Filter
function filterCategory(category) {
    if (category === "all") {
        return books;
    }
    return books.filter(book => book.category === category);
}

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}