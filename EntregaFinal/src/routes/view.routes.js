import { Router } from "express";
import ProductDao from "../dao/dbManager/product.dao.js";
import messageModel from "../models/message.model.js";

const router = Router();
const productDao = new ProductDao();

router.post("/", async (req, res) => {
  try {
    const message = req.body;
    const response = await messageModel.create(message);
    res.json({
      message: "ok",
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await productDao.findProduct();
    res.render("index", { products });
  } catch (error) {
    console.log(error);
  }
});

export default router;
