const users = JSON.parse(localStorage.getItem("users")) || [];


// Login Password Toggle

const togglePassword = document.getElementById("togglePassword");
const loginPassword = document.getElementById("loginPassword");


if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (loginPassword.type === "password") {

            loginPassword.type = "text";
            togglePassword.textContent = "🙈";

        } else {

            loginPassword.type = "password";
            togglePassword.textContent = "👁";

        }

    });

}



// Signup Password Toggle

const toggleSignupPassword = document.getElementById("toggleSignupPassword");
const signupPassword = document.getElementById("signupPassword");


if(toggleSignupPassword){

    toggleSignupPassword.addEventListener("click",()=>{

        if(signupPassword.type==="password"){

            signupPassword.type="text";
            toggleSignupPassword.textContent="🙈";

        }else{

            signupPassword.type="password";
            toggleSignupPassword.textContent="👁";

        }

    });

}



// Signup System

const signupForm = document.getElementById("signupForm");


if(signupForm){

    signupForm.addEventListener("submit",(e)=>{

        e.preventDefault();


        const name =
        document.getElementById("signupName").value.trim();


        const email =
        document.getElementById("signupEmail").value.trim();


        const password =
        document.getElementById("signupPassword").value;


        const confirmPassword =
        document.getElementById("confirmPassword").value;



        if(password !== confirmPassword){

            alert("Password does not match");
            return;

        }



        const allUsers =
        JSON.parse(localStorage.getItem("users")) || [];



        const exist =
        allUsers.find(user=>user.email===email);



        if(exist){

            alert("Email already registered");
            return;

        }



        allUsers.push({

            name,
            email,
            password

        });



        localStorage.setItem(
            "users",
            JSON.stringify(allUsers)
        );


        alert("Account created successfully");


        window.location.href="index.html";


    });

}



// Login System

const loginForm =
document.getElementById("loginForm");


if(loginForm){

    loginForm.addEventListener("submit",(e)=>{

        e.preventDefault();



        const email =
        document.getElementById("loginEmail").value.trim();


        const password =
        document.getElementById("loginPassword").value;



        const allUsers =
        JSON.parse(localStorage.getItem("users")) || [];



        const user =
        allUsers.find(
            u=>u.email===email && u.password===password
        );



        if(user){


            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            window.location.href="dashboard.html";


        }else{


            alert("Invalid email or password");


        }


    });

}



// Dashboard User

const username =
document.getElementById("username");


if(username){


    const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );


    if(!currentUser){

        window.location.href="index.html";

    }else{

        username.textContent=currentUser.name;

    }

}



// Logout

const logoutBtn =
document.getElementById("logoutBtn");


if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        localStorage.removeItem("currentUser");

        window.location.href="index.html";

    });

}



// Book Data

const defaultBooks=[

{
title:"Python Programming",
author:"John Smith",
category:"Programming"
},

{
title:"Java Programming",
author:"James Gosling",
category:"Programming"
},

{
title:"Machine Learning Basics",
author:"Andrew Ng",
category:"Programming"
},

{
title:"Artificial Intelligence",
author:"Russell",
category:"Science"
},

{
title:"Database System",
author:"Silberschatz",
category:"Programming"
},

{
title:"Clean Code",
author:"Robert Martin",
category:"Programming"
},

{
title:"Computer Network",
author:"Tanenbaum",
category:"Programming"
},

{
title:"Operating System",
author:"William Stallings",
category:"Programming"
},

{
title:"Atomic Habits",
author:"James Clear",
category:"Novel"
},

{
title:"The Alchemist",
author:"Paulo Coelho",
category:"Novel"
}

];



let books =
JSON.parse(localStorage.getItem("books"))
|| defaultBooks;



localStorage.setItem(
"books",
JSON.stringify(books)
);



// Display Books

const bookContainer =
document.getElementById("bookContainer");


function displayBooks(data){


if(!bookContainer)
return;



bookContainer.innerHTML="";



data.forEach((book,index)=>{


bookContainer.innerHTML += `

<div class="book-card">

<h3>${book.title}</h3>

<p>Author: ${book.author}</p>

<p>Category: ${book.category}</p>


<button onclick="editBook(${index})">
Edit
</button>


<button onclick="deleteBook(${index})">
Delete
</button>


</div>

`;

});


}



displayBooks(books);



// Add Book

const addBookBtn =
document.getElementById("addBookBtn");


if(addBookBtn){


addBookBtn.addEventListener("click",()=>{


const title =
document.getElementById("bookTitle").value;


const author =
document.getElementById("bookAuthor").value;


const category =
document.getElementById("bookCategory").value;



if(title && author){


books.push({

title,
author,
category

});


localStorage.setItem(
"books",
JSON.stringify(books)
);


displayBooks(books);


}


});


}



// Delete Book

function deleteBook(index){


books.splice(index,1);



localStorage.setItem(
"books",
JSON.stringify(books)
);



displayBooks(books);


}



// Edit Book

function editBook(index){


const title =
prompt(
"New book title",
books[index].title
);



if(title){


books[index].title=title;


localStorage.setItem(
"books",
JSON.stringify(books)
);



displayBooks(books);


}


}



// Search

const searchBook =
document.getElementById("searchBook");


if(searchBook){


searchBook.addEventListener("input",()=>{


const value =
searchBook.value.toLowerCase();



const result =
books.filter(book=>

book.title.toLowerCase()
.includes(value)

);



displayBooks(result);


});


}



// Category Filter

const categoryFilter =
document.getElementById("categoryFilter");


if(categoryFilter){


categoryFilter.addEventListener("change",()=>{


const category =
categoryFilter.value;



if(category==="all"){

displayBooks(books);


}else{


const result =
books.filter(book=>

book.category===category

);


displayBooks(result);


}


});


}
const totalBooks =
document.getElementById("totalBooks");


const availableBooks =
document.getElementById("availableBooks");


const borrowedBooks =
document.getElementById("borrowedBooks");



if(totalBooks){


const allBooks =
JSON.parse(
localStorage.getItem("books")
) || [];



const borrowed =
JSON.parse(
localStorage.getItem("borrowedBooks")
) || [];



totalBooks.textContent =
allBooks.length;



availableBooks.textContent =
allBooks.length - borrowed.length;



borrowedBooks.textContent =
borrowed.length;


}
const borrowContainer =
document.getElementById("borrowContainer");


const borrowHistory =
document.getElementById("borrowHistory");



let borrowedBooks =
JSON.parse(
localStorage.getItem("borrowedBooks")
) || [];



function displayBorrowBooks(){


if(!borrowContainer)
return;



const books =
JSON.parse(
localStorage.getItem("books")
) || [];



borrowContainer.innerHTML="";



books.forEach((book,index)=>{


borrowContainer.innerHTML += `

<div class="book-card">

<h3>${book.title}</h3>

<p>
Author: ${book.author}
</p>

<p>
Category: ${book.category}
</p>


<button onclick="borrowBook(${index})">
Borrow
</button>


</div>

`;


});


}



displayBorrowBooks();





function borrowBook(index){


const books =
JSON.parse(
localStorage.getItem("books")
);



const book = books[index];



borrowedBooks.push({

title: book.title,

date: new Date()
.toLocaleDateString(),

status:"Borrowed"

});



localStorage.setItem(
"borrowedBooks",
JSON.stringify(borrowedBooks)
);



alert("Book borrowed successfully");


displayHistory();


}





function returnBook(index){


borrowedBooks[index].status="Returned";


localStorage.setItem(

"borrowedBooks",

JSON.stringify(borrowedBooks)

);



displayHistory();


}





function displayHistory(){


if(!borrowHistory)
return;



borrowHistory.innerHTML="";



borrowedBooks.forEach((book,index)=>{


borrowHistory.innerHTML += `

<div class="book-card">


<h3>
${book.title}
</h3>


<p>
Date: ${book.date}
</p>


<p>
Status: ${book.status}
</p>



${
book.status==="Borrowed"

?

`<button onclick="returnBook(${index})">
Return
</button>`

:

""

}


</div>


`;


});


}



displayHistory();
const memberContainer =
document.getElementById("memberContainer");


let members =
JSON.parse(
localStorage.getItem("members")
) || [];



function displayMembers(data){


if(!memberContainer)
return;



memberContainer.innerHTML="";



data.forEach((member,index)=>{


memberContainer.innerHTML += `

<div class="book-card">

<h3>
${member.name}
</h3>


<p>
Email: ${member.email}
</p>


<button onclick="deleteMember(${index})">
Delete
</button>


</div>

`;



});


}



displayMembers(members);





const addMemberBtn =
document.getElementById("addMemberBtn");



if(addMemberBtn){


addMemberBtn.addEventListener("click",()=>{


const name =
document.getElementById("memberName").value;


const email =
document.getElementById("memberEmail").value;



if(name && email){


members.push({

name,
email

});


localStorage.setItem(
"members",
JSON.stringify(members)
);



displayMembers(members);


}


});


}





function deleteMember(index){


members.splice(index,1);



localStorage.setItem(
"members",
JSON.stringify(members)
);



displayMembers(members);


}





const searchMember =
document.getElementById("searchMember");



if(searchMember){


searchMember.addEventListener("input",()=>{


const value =
searchMember.value.toLowerCase();



const result =
members.filter(member=>

member.name
.toLowerCase()
.includes(value)

);



displayMembers(result);



});


}
const totalBooks =
document.getElementById("totalBooks");


const availableBooks =
document.getElementById("availableBooks");



if(totalBooks){


let books =
JSON.parse(
localStorage.getItem("books")
) || [];



let total = books.reduce(
(sum,book)=>
sum + Number(book.quantity),
0
);



totalBooks.innerText =
total;



availableBooks.innerText =
total;



}
// Dark Mode


const themeBtn =
document.getElementById("themeBtn");



if(localStorage.getItem("darkMode")=="true"){

document.body.classList.add("dark");

}



if(themeBtn){

themeBtn.onclick=function(){


document.body.classList.toggle("dark");


localStorage.setItem(

"darkMode",

document.body.classList.contains("dark")

);


};


}