document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const username = document.getElementById("username");
      const password = document.getElementById("password");
      const errorFeedback = document.getElementById("error-feedback");
  
      // Проверка, являются ли введенные учетные данные администраторскими
      if (username.value === "adminBalzhan" && password.value === "Qwerty123") {
        // Если да, перенаправьте пользователя на страницу администратора
        window.location.href = "admin.html";
      } else {
        // Проверьте, существует ли пользователь с указанным именем пользователя (это может потребовать доступ к вашей базе данных или локальному хранилищу)
        if (userExists(username.value)) {
          // Если пользователь существует, но пароль неверен, вы можете добавить соответствующее сообщение
          errorFeedback.textContent = "Incorrect password";
        } else {
          // Если нет пользователя с указанным именем пользователя, вы можете сообщить об этом
          errorFeedback.textContent = "There is no user with this username";
        }
      }
    });
  });
  
  function userExists(username) {
    if (typeof Storage !== "undefined") {
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      return users.some(user => user.username === username);
    }
    return false;
  }
  