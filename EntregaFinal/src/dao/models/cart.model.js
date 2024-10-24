import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  id: Number,
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

const cartModel = model("Cart", cartSchema);

export { cartModel };
