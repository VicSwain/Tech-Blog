console.log("singup")

// document.body.innerHTML += "<h1>Confirming the link</h1>" leaving for later test notation
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //localhost:3001/profile is where we redirect them to
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };


document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);
