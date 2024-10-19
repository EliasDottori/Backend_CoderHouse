import { Router } from "express";
import ProductDao from "../dao/dbManager/product.dao.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router();
const productDao = new ProductDao();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, query = "", sort } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    const skip = (parsedPage - 1) * parsedLimit;

    const filter = query ? { nombre: { $regex: query, $options: "i" } } : {};

    const sortOptions =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    console.log(filter);
    console.log(parsedLimit);
    console.log(skip);
    console.log(sortOptions);
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
    console.log("asdasfd", productResult);

    res.render("index", { productResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Error Product",
    });
  }
});

export default router;
