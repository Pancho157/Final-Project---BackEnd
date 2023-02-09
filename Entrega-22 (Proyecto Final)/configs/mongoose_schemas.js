const mongoose = require("mongoose");

// --------------------- Chat Schema & Model ------------------------
const MessageSchema = mongoose.Schema(
  {
    message: { type: String },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },

  { strict: false, timestamps: true } // CreatedAt y UpdatedAt
);

let Message = mongoose.model("messages", MessageSchema);

// --------------------- Users Schema & Model ------------------------
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "La contraseña debe tener 6 caracteres como mínimo"],
    },
  },

  { strict: false, timestamps: false, versionKey: false }
);

let Users = mongoose.model("users", UserSchema);

// --------------------- Carts Schema & Model ------------------------
const CartsSchema = mongoose.Schema(
  {},

  { strict: false, timestamps: false, versionKey: false }
);

let Carts = mongoose.model("carts", CartsSchema);

// --------------------- Products Schema & Model ------------------------

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
  },

  { strict: false, timestamps: false, versionKey: false }
);

let Products = mongoose.model("products", ProductSchema);

// --------------------- Purchases Schema & Model ------------------------
const PurchasesSchema = mongoose.Schema(
  {},

  { strict: false, timestamps: false, versionKey: false }
);

let Purchases = mongoose.model("purchases", PurchasesSchema);

module.exports = { Message, Users, Products, Carts, Purchases };
