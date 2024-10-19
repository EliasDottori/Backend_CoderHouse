import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import viewRouter from "./routes/view.routes.js";
import productsRouter from "./routes/product.routes.js";
import { password, db_name, port } from "./env.js";

const app = express();
const httpServer = app.listen(port, () => {
  console.log(`Servidor online! Vínculo: http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api/products", productsRouter);
app.use("/", viewRouter);

mongoose
  .connect(
    `mongodb+srv://EliasDottori:${password}@codercluster.dbbse10.mongodb.net/${db_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("db coneccted");
  })
  .catch((error) => console.log(error));

// const io = new Server(httpServer);
//socket com

// let messages = [];

// io.on("connection", (socket) => {
//   console.log("nueva conexion");

//   socket.on("message", async (data) => {
//     try {
//       const message = new messageModel({
//         message: data.message,
//         user: data.user,
//         timestamp: new Date(),
//       });
//       await message.save();
//       io.emit("messagesLogs", await messageModel.find());
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   socket.emit("server_message", "mensaje enviado desde el server");

//   socket.on("mensProduct", (data) => {
//     console.log(data);
//   });

//   socket.on("productoNuevo", (data) => {
//     console.log(data);
//     productosNuevos.push(data);
//     socket.emit("productosNuevos", productosNuevos);
//   });
// });
