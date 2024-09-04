import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewRouter from "./routes/view.routes.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor online! Vínculo: http://localhost:${port}`);
});

const io = new Server(httpServer);

const productosNuevos = [];

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use("/", viewRouter);

//socket com

let messages = [];

io.on("connection", (socket) => {
  console.log("nueva conexion");

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messagesLogs", messages);
    console.log(messages);
  });

  socket.emit("server_message", "mensaje enviado desde el server");

  socket.on("mensProduct", (data) => {
    console.log(data);
  });

  socket.on("productoNuevo", (data) => {
    console.log(data);
    productosNuevos.push(data);
    socket.emit("productosNuevos", productosNuevos);
  });
});
