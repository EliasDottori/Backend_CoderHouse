import { Router } from "express";
import productDao from "../dao/dbManager/product.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const product = await productDao.findProduct();

    res.json({
      product,
      message: "OK products",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error Product",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await productDao.createProduct();

    res.json({
      product,
      message: "OK products",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error Product",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productDao.updateProduct(id);

    res.json({
      product,
      message: "update OK",
    });
  } catch (error) {
    console.log(error);
    message: "Error update";
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productDao.updateProduct(id);

    res.json({
      product,
      message: "update OK",
    });
  } catch (error) {
    console.log(error);
    message: "Error update";
  }
});
