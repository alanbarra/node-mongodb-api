const mongoose = require("mongoose");

const Tarefa = mongoose.Schema(
  {
    descricao: { type: String, required: true, minLength: 3 },
    _listaId: { type: mongoose.Schema.Types.ObjectId, ref: "listas" },
    completa: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tarefas", Tarefa);
