const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "parter"],
    },
    info_id: {
      type: Schema.Types.ObjectId,
      ref: "infos",
    },
    googleId: {
      type: String,
    },

    resetToken: {
      type: String,
      index: { expires: "20s" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
