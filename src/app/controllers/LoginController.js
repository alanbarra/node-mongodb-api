const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

class LoginController {
  async login(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        error: true,
        code: 130,
        message: "Usuário não existe.",
      });
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      return res.status(400).json({
        error: true,
        code: 140,
        message: "Senha está incorreta.",
      });
    }

    return res.status(200).json({
      user: {
        _id: userExist._id,
        nome: userExist.nome,
        email: userExist.email,
      },
      token: jwt.sign({ id: userExist._id }, config.secret, {
        expiresIn: config.expireIn,
      }),
    });
  }
}

module.exports = new LoginController();
