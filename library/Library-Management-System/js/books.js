// Force update book data with new images
localStorage.removeItem("books");

let books = [

{
id:1,
title:"Clean Code",
author:"Robert C. Martin",
category:"Programming",
price:45.99,
rating:4.8,
availability:"In Stock",
quantity:10,
image:"https://covers.openlibrary.org/b/id/8445261-M.jpg"
},

{
id:2,
title:"JavaScript: The Definitive Guide",
author:"David Flanagan",
category:"Programming",
price:52.99,
rating:4.7,
availability:"In Stock",
quantity:8,
image:"https://covers.openlibrary.org/b/id/10526612-M.jpg"
},

{
id:3,
title:"Python Crash Course",
author:"Eric Matthes",
category:"Programming",
price:39.99,
rating:4.6,
availability:"In Stock",
quantity:12,
image:"https://covers.openlibrary.org/b/id/11532991-M.jpg"
},

{
id:4,
title:"Automate the Boring Stuff with Python",
author:"Al Sweigart",
category:"Programming",
price:29.99,
rating:4.5,
availability:"In Stock",
quantity:15,
image:"https://covers.openlibrary.org/b/id/12532137-M.jpg"
},

{
id:5,
title:"C++ Primer",
author:"Stanley B. Lippman",
category:"Programming",
price:58.99,
rating:4.7,
availability:"In Stock",
quantity:7,
image:"https://covers.openlibrary.org/b/id/8419225-M.jpg"
},

{
id:6,
title:"Effective Java",
author:"Joshua Bloch",
category:"Programming",
price:54.99,
rating:4.9,
availability:"In Stock",
quantity:9,
image:"https://covers.openlibary.org/b/id/8408961-M.jpg"
},

{
id:7,
title:"Head First Java",
author:"Kathy Sierra",
category:"Programming",
price:42.99,
rating:4.4,
availability:"In Stock",
quantity:11,
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMEHp6YCLviizWMHpztzEggrp4YgzyPa-LseCj8FOjxFrHuVJZG-XF8Mo&s=10"
},

{
id:8,
title:"Introduction to Algorithms",
author:"Thomas H. Cormen",
category:"Programming",
price:72.99,
rating:4.8,
availability:"In Stock",
quantity:6,
image:"https://covers.openlibrary.org/b/id/8400196-M.jpg"
},

{
id:9,
title:"Design Patterns",
author:"Erich Gamma",
category:"Programming",
price:59.99,
rating:4.6,
availability:"In Stock",
quantity:8,
image:"https://covers.openlibrary.org/b/id/8459128-M.jpg"
},

{
id:10,
title:"Computer Networks",
author:"Andrew S. Tanenbaum",
category:"Programming",
price:65.99,
rating:4.5,
availability:"In Stock",
quantity:7,
image:"https://covers.openlibrary.org/b/id/8436285-M.jpg"
},

{
id:11,
title:"Machine Learning Yearning",
author:"Andrew Ng",
category:"Science",
price:55.99,
rating:4.7,
availability:"In Stock",
quantity:5,
image:"https://covers.openlibrary.org/b/id/13535629-M.jpg"
},

{
id:12,
title:"Artificial Intelligence",
author:"Stuart Russell",
category:"Science",
price:89.99,
rating:4.6,
availability:"In Stock",
quantity:4,
image:"https://covers.openlibrary.org/b/id/8436286-M.jpg"
},

{
id:13,
title:"Database System Concepts",
author:"Abraham Silberschatz",
category:"Programming",
price:68.99,
rating:4.5,
availability:"In Stock",
quantity:5,
image:"https://covers.openlibrary.org/b/id/8436287-M.jpg"
},

{
id:14,
title:"Operating System Concepts",
author:"Abraham Silberschatz",
category:"Science",
price:75.99,
rating:4.4,
availability:"In Stock",
quantity:4,
image:"https://covers.openlibrary.org/b/id/8436288-M.jpg"
},

{
id:15,
title:"Web Development with Node and Express",
author:"Ethan Brown",
category:"Programming",
price:35.99,
rating:4.3,
availability:"In Stock",
quantity:10,
image:"https://covers.openlibrary.org/b/id/13535630-M.jpg"
},

{
id:16,
title:"The Alchemist",
author:"Paulo Coelho",
category:"Novel",
price:14.99,
rating:4.7,
availability:"In Stock",
quantity:20,
image:"https://covers.openlibrary.org/b/id/8445262-M.jpg"
},

{
id:17,
title:"Atomic Habits",
author:"James Clear",
category:"Novel",
price:16.99,
rating:4.8,
availability:"In Stock",
quantity:18,
image:"https://covers.openlibrary.org/b/id/13535631-M.jpg"
},

{
id:18,
title:"1984",
author:"George Orwell",
category:"Novel",
price:12.99,
rating:4.6,
availability:"In Stock",
quantity:15,
image:"https://covers.openlibrary.org/b/id/8445263-M.jpg"
}

];


localStorage.setItem(
"books",
JSON.stringify(books)
);




// Add Book

function addBook(title,author,category,quantity,price,rating,availability,image){

books.push({

id:Date.now(),

title,

author,

category,

quantity:Number(quantity),
price:Number(price),
rating:Number(rating),
availability,
image:image || "https://via.placeholder.com/200x300?text=No+Image"

});


saveBooks();

}




// Delete Book

function deleteBook(id){

books =
books.filter(
book=>book.id!==id
);


saveBooks();

}




// Edit Book

function editBook(id,data){


const book =
books.find(
b=>b.id===id
);



if(book){

book.title=data.title;

book.author=data.author;

book.category=data.category;

book.quantity=Number(data.quantity);
book.price=Number(data.price);
book.rating=Number(data.rating);
book.availability=data.availability;
book.image=data.image;

}



saveBooks();


}




// Search

function searchBooks(value){


return books.filter(book=>

book.title
.toLowerCase()
.includes(
value.toLowerCase()
)

);


}





// Filter

function filterCategory(category){


if(category==="all"){

return books;

}


return books.filter(book=>

book.category===category

);


}





function saveBooks(){

localStorage.setItem(

"books",

JSON.stringify(books)

);

}