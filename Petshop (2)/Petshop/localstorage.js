document.addEventListener("DOMContentLoaded", function() {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if (userExists(username, email)) {
    } else {

      const userData = {
        username: username,
        email: email,
      };

      if (typeof Storage !== "undefined") {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
      } else {
      }
    }
  });
});

function userExists(username, email) {
  if (typeof Storage !== "undefined") {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.username === username || user.email === email);
  }
  return false;
}
