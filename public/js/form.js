document.getElementById("nameForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("nameInput").value.trim();

  if (!nameInput) {
    showNotification("Please enter your name.", "is-danger");
    return;
  }

  window.location.href = `/${encodeURIComponent(nameInput)}`;
});

function showNotification(message, type = "is-info") {
  const notificationBox = document.createElement("div");
  notificationBox.className = `notification ${type} mt-3`;
  notificationBox.textContent = message;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", () => {
    notificationBox.remove();
  });
  notificationBox.appendChild(deleteButton);

  const formColumn = document.querySelector(".column.is-three-fifths");
  formColumn.appendChild(notificationBox);

  setTimeout(() => {
    notificationBox.remove();
  }, 2000);
}
