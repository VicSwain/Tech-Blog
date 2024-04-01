console.log("Linked signup");


const handleSignupForm = async (e) => {
    e.preventDefault()
    console.log("Signup happens here")
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log("email: ", email)
    console.log("username: ", username)
    console.log("password: ", password)
    if(!email || password.length < 8 || !username){
        alert("Error with credentials")
        return
    }
    const response = await fetch("/api/users", {
        method: 'POST',
        body: JSON.stringify({ email, password,username }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(response.ok){
        document.location.replace("/")
    } else {
        alert("Error with validation on backend")
    }
}


document.getElementById("signup-form").addEventListener("submit", handleSignupForm)