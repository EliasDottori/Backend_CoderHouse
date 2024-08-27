const express = require("express");
const ProductManager = require("./ProductManager");
const CartManager = require("./CartManager");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("productos.json");
const cartManager = new CartManager("");

const productRouter = express.Router();

//Traer todos los productos
productRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Traer productos mediante ID
productRouter.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Actualiza producto
productRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productManager.addProduct(newProduct);
    res.json({ message: `Producto ${product} agregado exitosamente` });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.use("/api/products", productRouter);

const cartRouter = express.Router();

//Crea Carrito
cartRouter.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res.json(newCart);
});

//Trae carrito mediante ID
cartRouter.get("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = cartManager.getCartById(cartId);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

//Carga producto mediante ID en carrito elegido mediante ID
cartRouter.post("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity) || 1;

  cartManager.addProductToCart(cartId, productId, quantity);
  res.json({ message: "Producto agregado al carrito" });
});

app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la aplicación de productos y carritos!");
});

app.listen(port, () => {
  console.log(`Servidor online! Vínculo: http://localhost:${port}`);
});
