const Tarefa = require("../models/Tarefa");

class TarefaController {
  async index(req, res) {

    const { _listaId } = req.params;

    try {
      const tarefas = await Tarefa.find({ _listaId }).populate("_listaId");
      return res.status(200).json({
        error: false,
        tarefas: tarefas,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao listar Tarefas: " + error,
      });
    }
  }

  async show(req, res) {
    const { _id } = req.params;

    try {
      const tarefa = await Tarefa.findById({ _id }).populate("_listaId");
      return res.status(200).json({
        error: false,
        tarefa: tarefa,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao buscar tarefa: " + error,
      });
    }
  }

  async store(req, res) {
    const { descricao, _listaId, completa } = req.body;

    const data = { descricao, _listaId, completa };

    try {
      await Tarefa.create(data);
      return res.status(200).json({
        error: false,
        message: "Tarefa cadastrada com sucesso",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar cadastrar tarefa no BD mongo: " + error,
      });
    }
  }
  async update(req, res) {
    const { _id } = req.params;
    const { descricao, completa } = req.body;
    const data = { descricao, completa };

    try {
      const tarefa = await Tarefa.findByIdAndUpdate(_id, data, { new: true }).populate("_listaId");
      return res.status(200).json({
        error: false,
        message: "Tarefa atualizada com sucesso",
        tarefa: tarefa,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar atualizar tarefa no MongoDB: " + error,
      });
    }
  }

  async delete(req, res) {
    const { _id } = req.params;

    try {
      await Tarefa.findByIdAndRemove(_id);
      return res.status(200).json({
        error: false,
        message: "Tarefa apagada com sucesso",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar apagar tarefa no MongoDB: " + error,
      });
    }
  }
}

module.exports = new TarefaController();
