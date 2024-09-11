import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewRouter from "./routes/view.routes.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { password, db_name, port } from "./env.js";
import messageModel from "./models/message.model.js";

const app = express();
const httpServer = app.listen(port, () => {
  console.log(`Servidor online! Vínculo: http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(httpServer);

const productosNuevos = [];

mongoose
  .connect(
    `mongodb+srv://EliasDottori:${password}@codercluster.dbbse10.mongodb.net/${db_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("db coneccted");
  })
  .catch((error) => console.log(error));

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

  socket.on("message", async (data) => {
    try {
      const message = new messageModel({
        message: data.message,
        user: data.user,
        timestamp: new Date(),
      });
      await message.save();
      io.emit("messagesLogs", await messageModel.find());
    } catch (error) {
      console.error(error);
    }
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
