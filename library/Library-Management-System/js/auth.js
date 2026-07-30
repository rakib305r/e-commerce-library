// Signup

const signupForm = document.getElementById("signupForm");


if(signupForm){


signupForm.addEventListener("submit",function(e){


e.preventDefault();


let user={

name:document.getElementById("name").value,

email:document.getElementById("email").value,

password:document.getElementById("password").value

};



let confirmPassword =
document.getElementById("confirmPassword").value;



if(user.password !== confirmPassword){

alert("Password does not match");
return;

}



localStorage.setItem(
"user",
JSON.stringify(user)
);



alert("Signup Successful");


window.location.href="index.html";


});


}





// Login


const loginForm =
document.getElementById("loginForm");



if(loginForm){


loginForm.addEventListener("submit",function(e){


e.preventDefault();



let email =
document.getElementById("loginEmail").value;



let password =
document.getElementById("loginPassword").value;




let savedUser =
JSON.parse(
localStorage.getItem("user")
);



if(!savedUser){

alert("Please signup first");

return;

}



if(
email === savedUser.email &&
password === savedUser.password
){


alert("Login Successful");


window.location.href="dashboard.html";


}

else{


alert("Wrong Email or Password");


}



});


}