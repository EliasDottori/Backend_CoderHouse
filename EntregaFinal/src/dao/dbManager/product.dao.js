import { productModel } from "../models/product.model.js";

class productDao {
  async findProduct(filter, limit, skip, sort) {
    return await productModel
      .find(filter)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean();
  }

  async findProductbyID(_id) {
    return await productModel.findById({ _id });
  }

  async createProduct() {
    return await productModel.create(product);
  }

  async updateProduct(_id, product) {
    return await productModel.findByIdAndUpdate({ _id }, product);
  }

  async deleteProduct(_id, product) {
    return await productModel.findByIdAndDelete({ _id }, product);
  }
}
export default productDao;
