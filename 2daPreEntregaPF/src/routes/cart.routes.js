import { Router } from "express";
import cartDao from "../dao/dbManager/cart.dao.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await cartDao.getCartById(id);
  res.json(cart || {});
  console.log(cart);
});

router.post("/", async (req, res) => {
  try {
    const { id, product, quantity } = req.body;

    // Busca el carrito por ID
    const cart = await cartDao.getCartById(id);

    if (!cart) {
      // Si el carrito no existe, créalo
      const nuevoCart = await cartDao.createCart(id, [{ product, quantity }]);
      res.status(201).json(nuevoCart);
    } else {
      // Si el carrito ya existe, agrega el producto
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product === product
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Si el producto no está en el carrito, agrégalo
        cart.products.push({ product, quantity });
      }

      await cartDao.updateCart(cart);
      res.redirect(`/cart/${id}`);
      console.log(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});
