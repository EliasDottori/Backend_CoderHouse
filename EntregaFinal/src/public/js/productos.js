document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("listLink")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const name = document.getElementById("nameProduct").value;
      const sort = document.getElementById("sortOrder").value;

      const url = `?page=1&limit=3&sort=${sort}&query=${encodeURIComponent(
        name
      )}`;
      window.location.href = url;
    });
});
