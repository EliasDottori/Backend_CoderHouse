import { Router } from "express";
import ProductDao from "../dao/dbManager/product.dao.js";

const router = Router();
const productDao = new ProductDao();

router.get("/", async (req, res) => {
  try {
    const products = await productDao.findProduct();
    res.render("index", { products });
  } catch (error) {
    console.log(error);
  }
});

export default router;
