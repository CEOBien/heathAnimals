const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const messageSchema = new Schema(
  {
    message: {
        text: { type: String, required: true },
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);
