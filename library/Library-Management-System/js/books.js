let books = JSON.parse(localStorage.getItem("books")) || [

{
id:1,
title:"Python Programming",
author:"John Smith",
category:"Programming",
quantity:5
},

{
id:2,
title:"Java Complete Reference",
author:"Herbert Schildt",
category:"Programming",
quantity:4
},

{
id:3,
title:"C Programming",
author:"Dennis Ritchie",
category:"Programming",
quantity:6
},

{
id:4,
title:"C++ Primer",
author:"Stanley Lippman",
category:"Programming",
quantity:3
},

{
id:5,
title:"Machine Learning Basics",
author:"Andrew Ng",
category:"Science",
quantity:5
},

{
id:6,
title:"Artificial Intelligence",
author:"Russell Norvig",
category:"Science",
quantity:4
},

{
id:7,
title:"Database System Concepts",
author:"Silberschatz",
category:"Programming",
quantity:5
},

{
id:8,
title:"Computer Networks",
author:"Andrew Tanenbaum",
category:"Science",
quantity:3
},

{
id:9,
title:"Operating System",
author:"Galvin",
category:"Science",
quantity:4
},

{
id:10,
title:"Web Development",
author:"Jon Duckett",
category:"Programming",
quantity:5
}

];


localStorage.setItem(
"books",
JSON.stringify(books)
);




// Add Book

function addBook(title,author,category,quantity){

books.push({

id:Date.now(),

title,

author,

category,

quantity:Number(quantity)

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