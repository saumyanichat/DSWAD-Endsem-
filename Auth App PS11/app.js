let users = JSON.parse(localStorage.getItem("users")) || [];

// REGISTER
function register(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let dob = document.getElementById("dob").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("password").value;

    // simple validation
    if(name=="" || email=="" || mobile=="" || dob=="" || city=="" || address=="" || password==""){
        alert("All fields required");
        return;
    }

    if(!email.includes("@")){
        alert("Invalid Email");
        return;
    }

    if(mobile.length != 10 || isNaN(mobile)){
        alert("Invalid Mobile");
        return;
    }

    let user = {name, email, mobile, dob, city, address, password};

    setTimeout(() => {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registered Successfully");

        // CLEAR FORM
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("mobile").value="";
        document.getElementById("dob").value="";
        document.getElementById("city").value="";
        document.getElementById("address").value="";
        document.getElementById("password").value="";

    }, 300);
}


// LOGIN
function login(){

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPass").value;

    let found = users.find(u => u.email === email && u.password === password);

    if(found){
        alert("Login Successful");

        // CLEAR FORM
        document.getElementById("loginEmail").value="";
        document.getElementById("loginPass").value="";

        window.location.href = "list.html";
    } 
    else{
        alert("Invalid Login");
    }
}