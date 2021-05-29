const mongoose = require("mongoose");

const Lista = mongoose.Schema(
  {
    titulo: { type: String, required: true, minLength: 3 },
    descricao: { type: String, required: true },
    _userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("listas", Lista);
