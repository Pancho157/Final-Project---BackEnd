const ProductSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  timestamp: Date,
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: String,
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  timestamp: Date,
  cartProducts: [],
});

module.exports = { ProductSchema, CartSchema };
