import { Router } from "express";
import ProductDao from "../dao/dbManager/product.dao.js";

const router = Router();
const productDao = new ProductDao();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const singleProduct = await productDao.findProductbyID(id);
    console.log(singleProduct);
    res.render("singleProduct", { singleProduct });
  } catch (error) {
    console.log(error);
  }
});

export default router;
