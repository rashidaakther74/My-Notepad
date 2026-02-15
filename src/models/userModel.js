const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minlength: [3, "User name must be at least 3 characters"],
    maxlength: [31, "User name can be maximum 30 characters"],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    lowercase: true,
    validate: {
        validator: (v) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        },
      },
      message: "Please enter a valid email",
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    minlength: [6, "User password must be at least 6 characters"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
     isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
},
  { timestamps: true },
)


const User = model("User", userSchema);
module.exports = User;