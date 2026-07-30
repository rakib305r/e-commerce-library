// Signup

const signupForm = document.getElementById("signupForm");


if (signupForm) {


    signupForm.addEventListener("submit", function (e) {


        e.preventDefault();


        let user = {

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            password: document.getElementById("password").value

        };



        let confirmPassword =
            document.getElementById("confirmPassword").value;



        if (user.password !== confirmPassword) {

            alert("Password does not match");
            return;

        }

        if (user.password.length < 6) {

            alert("Password must be at least 6 characters");
            return;

        }

        if (user.name.length < 2) {

            alert("Name must be at least 2 characters");
            return;

        }



        // Get existing users array
        let allUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        let existingUser = allUsers.find(u => u.email === user.email);
        if (existingUser) {
            alert("Email already registered");
            return;
        }



        // Add new user
        allUsers.push(user);
        localStorage.setItem("users", JSON.stringify(allUsers));



        alert("Signup Successful");


        window.location.href = "login.html";


    });


}





// Login


const loginForm =
    document.getElementById("loginForm");



if (loginForm) {


    loginForm.addEventListener("submit", function (e) {


        e.preventDefault();



        let email =
            document.getElementById("loginEmail").value;



        let password =
            document.getElementById("loginPassword").value;



        let allUsers = JSON.parse(localStorage.getItem("users")) || [];



        let savedUser = allUsers.find(u => u.email === email && u.password === password);



        if (!savedUser) {

            alert("Invalid email or password");
            return;

        }



        // Set current user
        localStorage.setItem("currentUser", JSON.stringify(savedUser));


        // Check remember me
        const rememberMe = document.getElementById("rememberMe");
        if (rememberMe && rememberMe.checked) {
            localStorage.setItem("rememberedEmail", email);
        } else {
            localStorage.removeItem("rememberedEmail");
        }


        alert("Login Successful");


        window.location.href = "dashboard.html";


    });



}

// Forgot password function
function showForgotPassword() {
    alert("Password reset link has been sent to your email (demo feature)");
}
