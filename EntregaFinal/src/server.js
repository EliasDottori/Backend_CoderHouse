import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import viewRouter from "./routes/view.routes.js";
import productsRouter from "./routes/product.routes.js";
import { password, db_name, port } from "./env.js";
import singleProductRouter from "./routes/singleProduct.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();
app.listen(port, () => {
  console.log(`Servidor online! Vínculo: http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use("/", viewRouter);
app.use("/singleProduct", singleProductRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

mongoose
  .connect(
    `mongodb+srv://EliasDottori:${password}@codercluster.dbbse10.mongodb.net/${db_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("db coneccted");
  })
  .catch((error) => console.log(error));
