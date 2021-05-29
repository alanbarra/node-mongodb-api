const Lista = require("../models/Lista");
const Tarefa = require("../models/Tarefa");

class ListaController {
  async index(req, res) {

    const _userId = req.user_id;

    try {
      const listas = await Lista.find({ "_userId": { $in: _userId } }).populate("_userId");
      return res.status(200).json({
        error: false,
        listas: listas,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao consultar Lista: " + error,
      });
    }
  }

  async show(req, res) {
    const { _id } = req.params;

    try {
      const lista = await Lista.findById({ _id }).populate("_userId");
      return res.status(200).json({
        error: false,
        lista: lista,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao buscar lista: " + error,
      });
    }
  }

  async store(req, res) {
    const { titulo, descricao, _userId } = req.body;

    const data = { titulo, descricao, _userId };

    try {
      await Lista.create(data);
      return res.status(200).json({
        error: false,
        message: "Lista cadastrada com sucesso",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar cadastrar lista no BD mongo: " + error,
      });
    }
  }
  async update(req, res) {
    const { _id } = req.params;
    const { titulo, descricao } = req.body;
    const data = { titulo, descricao };

    try {
      const lista = await Lista.findByIdAndUpdate(_id, data, { new: true }).populate("_userId");
      return res.status(200).json({
        error: false,
        message: "Lista atualizada com sucesso",
        lista: lista,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar atualizar lista no MongoDB: " + error,
      });
    }
  }

  async delete(req, res) {
    const { _id } = req.params;

    try {
      await Lista.findByIdAndRemove(_id);

      await Tarefa.remove({ "_listaId": { $in: _id } });

      return res.status(200).json({
        error: false,
        message: "Lista e tarefas dessa lista apagadas com sucesso",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar apagar lista no MongoDB: " + error,
      });
    }
  }
}

module.exports = new ListaController();
