import { Schema, model } from "mongoose";

const productSchema = new Schema({
  nombre: { type: String, required: true },
  bodega: { type: String, required: true },
  tipo: { type: String, required: true },
  variedad: { type: String, required: true },
  año: { type: Number, required: true },
  precio: { type: Number, required: true },
});

const productModel = model("Product", productSchema);

export { productModel };
