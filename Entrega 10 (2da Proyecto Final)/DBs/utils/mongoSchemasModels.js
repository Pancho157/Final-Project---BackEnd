const mongoose = require("mongoose");
const { connection } = require("../db_initialization/mongoose");

const ProductSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: String,
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    cartProducts: [],
  },
  { timestamps: true }
);

let Product = connection.model("products", ProductSchema);
let Cart = connection.model("carts", CartSchema);

module.exports = { Product, Cart };
