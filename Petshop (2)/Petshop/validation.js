//НЕ ТРОГАТЬ ЭТОТ КОД
document.addEventListener("DOMContentLoaded", function() {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // предотвращает автоматическую отправку формы
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    let isValid = true;
    if (username.value.trim() === "" || username.value.length < 4) {
      usernameError.textContent = "Username must be at least 4 characters";
      isValid = false;
    } else {
      usernameError.textContent = "";
    }
    if (email.value.trim() === "" || !email.value.includes("@") || !email.value.includes(".")) {
      emailError.textContent = "Enter a valid email address";
      isValid = false;
    } else {
      emailError.textContent = "";
    }
    if (password.value.trim() === "" || !password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)) {
      passwordError.textContent = "Password must be at least 6 characters and contain at least one digit, one lowercase, and one uppercase letter";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    if (isValid) {
      if (userExists(email.value, username.value)) {
        usernameError.textContent = "Username or email is already taken.";
        isValid = false;
      }
    }

    if (isValid) {
      const userData = {
        username: username.value,
        email: email.value,
        registrationTime: new Date(),
      };

      if (typeof Storage !== "undefined") {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (!users.some(user => user.email === email.value || user.username === username.value)) {
          users.push(userData);

          // сохраняет массив пользователей обратно в localStorage
          localStorage.setItem("users", JSON.stringify(users));

          // очищает форму
          username.value = "";
          email.value = "";
          password.value = "";
        } else {
          usernameError.textContent = "Username or email is already taken.";
          isValid = false;
        }
      } else {
      }
    }
  });
});

function userExists(email, username) {
  if (typeof Storage !== "undefined") {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email || user.username === username);
  }
  return false;
}
