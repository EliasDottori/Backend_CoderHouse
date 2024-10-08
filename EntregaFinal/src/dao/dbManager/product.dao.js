import { productModel } from "../../models/product.model.js";

class productDao {
  async findProduct() {
    return await productModel.find().lean();
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
