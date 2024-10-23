import { cartModel } from "../models/cart.model.js";

const Cart = cartModel;

class cartDao {
  async getCartById(id) {
    return await cartModel.findOne({ id }).populate("products.product");
  }

  async createCart(id, products) {
    const cart = new Cart({ id, products });
    return await cart.save();
  }

  async updateCart(cart) {
    return await cart.save();
  }
}

export default new cartDao();
