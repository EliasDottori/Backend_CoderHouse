import { Router } from "express";
import productDao from "../dao/dbManager/product.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const product = await productDao.findProduct();
    const productResult = {
      payload: product.docs,
      nextPage: product.nextPage,
      prevPage: product.prevPage,
      hasNextPage: product.hasNextPage,
      hasPrevPage: product.hasNextPage,
      nextLink: `/api/product/${product.nextPage}`,
      prevLink: `/api/product/${product.prevLink}`,
    };
    res.json({
      productResult,
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

export default Router;
