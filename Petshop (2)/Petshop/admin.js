// admin.js

document.addEventListener("DOMContentLoaded", function() {
  const userList = document.getElementById("user-list");
  const editForm = document.getElementById("edit-form");
  const editUsername = document.getElementById("edit-username");
  const editEmail = document.getElementById("edit-email");
  const editSubmit = document.getElementById("edit-submit");
  const editCancel = document.getElementById("edit-cancel");

  let editingIndex = -1; // Индекс пользователя, которого мы редактируем

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Отобразите данные на странице
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    const usernameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const regTimeCell = document.createElement("td");
    const actionsCell = document.createElement("td");

    numberCell.textContent = index + 1;
    usernameCell.textContent = user.username;
    emailCell.textContent = user.email;
    const regTime = new Date(user.registrationTime).toLocaleString();
    regTimeCell.textContent = regTime;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
      // Обработчик редактирования пользователя
      editUser(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      // Обработчик удаления пользователя
      deleteUser(index);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(numberCell);
    row.appendChild(usernameCell);
    row.appendChild(emailCell);
    row.appendChild(regTimeCell);
    row.appendChild(actionsCell);

    userList.appendChild(row);
  });

  function editUser(index) {
    if (index >= 0 && index < users.length) {
      const user = users[index];
      editUsername.value = user.username;
      editEmail.value = user.email;
      editForm.style.display = "block";
      userList.style.display = "none";
      editingIndex = index;
    }
  }

  editSubmit.addEventListener("click", function() {
    if (editingIndex >= 0 && editingIndex < users.length) {
      // Сохраните изменения в пользователе
      const editedUser = users[editingIndex];
      editedUser.username = editUsername.value;
      editedUser.email = editEmail.value;

      // Обновите данные в localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Обновите отображение пользователей на странице
      location.reload();
    }

    // Очистите форму редактирования и вернитесь к списку пользователей
    editUsername.value = "";
    editEmail.value = "";
    editForm.style.display = "none";
    userList.style.display = "block";
    editingIndex = -1;
  });

  editCancel.addEventListener("click", function() {
    // Очистите форму редактирования и вернитесь к списку пользователей
    editUsername.value = "";
    editEmail.value = "";
    editForm.style.display = "none";
    userList.style.display = "block";
    editingIndex = -1;
  });

  function deleteUser(index) {
    if (index >= 0 && index < users.length) {
      // Удалите пользователя из массива
      users.splice(index, 1);
      // Обновите данные в localStorage
      localStorage.setItem("users", JSON.stringify(users));
      // Обновите отображение пользователей на странице
      location.reload();
    }
  }
});
