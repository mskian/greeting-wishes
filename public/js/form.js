document.getElementById("nameForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("nameInput").value.trim();

  if (!nameInput) {
    showNotification("Please enter your name.", "is-danger");
    return;
  }

  window.location.href = `/${encodeURIComponent(nameInput)}`;
});

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.querySelector('span').textContent = message;
  notification.classList.add('is-active');
  setTimeout(() => {
      notification.classList.remove('is-active');
  }, 2000);
}
