const mongoose = require("mongoose");

// --------------------- Messages Schema & Model ------------------------
const MessageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },

  { strict: false, _id: false, timestamps: true } // CreatedAt y UpdatedAt
);

let Message = mongoose.model("messages", MessageSchema);

// --------------------- Users Schema & Model ------------------------
const UserSchema = mongoose.Schema(
  {
    alias: {
      type: String,
      required: [true, "Alias is required"],
      unique: true,
      dropDups: true,
    },
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

// --------------------- Products Schema & Model ------------------------

const ProductSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
    },
  },

  { strict: false, timestamps: false, versionKey: false }
);

let Products = mongoose.model("products", ProductSchema);

module.exports = { Message, Users, Products };
