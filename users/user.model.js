const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: false,
  },
  emailOrPhone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});

module.exports = model("User", userSchema);
