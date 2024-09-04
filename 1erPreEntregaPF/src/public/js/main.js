const socket = io();

socket.on("server_message", (data) => {
  console.log(data);
});

let user;
const textChat = document.querySelector("#textChat");
const enviarButton = document.querySelector("#enviar");
const chatContent = document.querySelector("#chatContent");

Swal.fire({
  title: "Ingresa tu nombre",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

textChat.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

enviarButton.addEventListener("click", () => {
  sendMessage();
});

function sendMessage() {
  if (textChat.value.trim().length > 0) {
    socket.emit("message", { user: user, message: textChat.value });
    textChat.value = "";
  }
}

socket.on("messagesLogs", (data) => {
  let messages = "";
  console.log(data);
  data.forEach((message) => {
    messages += `<div class="globeChat" >
    <h4>${message.user}</h4>
    <p>${message.message}</p>
  </div>`;
  });
  chatContent.innerHTML = messages;
});
