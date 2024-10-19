import { Router } from "express";
import productDao from "../dao/dbManager/product.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 1, page = 1, query = "rutini", sort } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    const skip = (parsedPage - 1) * parsedLimit;

    const filter = query ? { name: { $regex: query, $options: "i" } } : {};
    const sortOptions =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    const products = await productDao.findProduct(
      filter,
      parsedLimit,
      skip,
      sortOptions
    );

    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parsedLimit);

    const productResult = {
      payload: products,
      totalProducts,
      totalPages,
      currentPage: parsedPage,
      hasNextPage: parsedPage < totalPages,
      hasPrevPage: parsedPage > 1,
      nextLink:
        parsedPage < totalPages
          ? `/api/product?page=${parsedPage + 1}&limit=${parsedLimit}`
          : null,
      prevLink:
        parsedPage > 1
          ? `/api/product?page=${parsedPage - 1}&limit=${parsedLimit}`
          : null,
    };

    res.json({
      productResult,
      message: "OK products",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
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
