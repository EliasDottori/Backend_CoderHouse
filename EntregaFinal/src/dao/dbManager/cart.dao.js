import { model } from "mongoose";

const Cart = model("Cart");

class cartDao {
  async getCartById(id) {
    return await Cart.findOne({ id });
  }

  async createCart(id, products) {
    const cart = new Cart({ id, products });
    return await cart.save();
  }

  async updateCart(cart) {
    return await cart.save();
  }
}

export default cartDao;
