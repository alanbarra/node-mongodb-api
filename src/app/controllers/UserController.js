const User = require("../models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup"); //validacao

class UserController {
  async getProfile(params, req, res) {

    //const { _id } = req.params;

    console.log(req._userId);

    try {
      const user = await User.findById({ _id });
      return res.status(200).json({
        error: false,
        user: user,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao recuperar dados do usuario logado: " + error,
      });
    }
  }

  async register(req, res) {
    let userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!",
      });
    }

    const { nome, email, password } = req.body;

    const data = { nome, email, password };

    data.password = await bcrypt.hash(data.password, 8);

    try {
      await User.create(data);
      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar inserir usuário no MongoDB: " + error,
      });
    }
  }
}

module.exports = new UserController();
