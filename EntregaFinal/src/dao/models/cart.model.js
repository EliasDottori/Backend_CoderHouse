import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  id: Number,
  products: [
    {
      product: Number,
      quantity: Number,
    },
  ],
});

const cartModel = model("Cart", cartSchema);

export default cartModel;
