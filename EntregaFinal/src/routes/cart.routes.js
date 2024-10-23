import { Router } from "express";
import cartDao from "../dao/dbManager/cart.dao.js";
import mongoose from "mongoose";

const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, product, quantity } = req.body;
    const productId = new mongoose.Types.ObjectId(product);
    console.log(1, productId);

    const cart = await cartDao.getCartById(id);

    if (!cart) {
      const nuevoCart = await cartDao.createCart(id, [
        { product: productId, quantity },
      ]);
      return res.status(201).json(nuevoCart);
    } else {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cartDao.updateCart(cart);
      console.log(2, cart);
      res.redirect(`/cart/${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.getCartById(cid);

    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== pid
    );

    await cartDao.updateCart(cart);
    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await cartDao.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = products;
    await cartDao.updateCart(cart);
    res.status(200).json({ message: "Carrito actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartDao.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === pid
    );
    if (productIndex === -1)
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });

    cart.products[productIndex].quantity = quantity;

    await cartDao.updateCart(cart);
    res.status(200).json({ message: "Cantidad actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartDao.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = [];

    await cartDao.updateCart(cart);
    res.status(200).json({ message: "Carrito vaciado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
