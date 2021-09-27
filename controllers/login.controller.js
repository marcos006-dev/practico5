const { validationResult } = require("express-validator");
const { generarJwt } = require("../helpers/generarJwt");
const Usuarios = require("../models/Usuarios.model");
require("dotenv").config();
const ctrlLogin = {};

ctrlLogin.rutaAutentificar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultUsuario = await Usuarios.find({
      email: email,
      password: password,
    });

    if (resultUsuario.length === 0) {
      return res.status(401).json({
        mensage: "Credenciales Invalidas (no se encontro coincidencia)",
      });
    }

    const idUsuario = resultUsuario[0]._id.toString();

    const resultToken = await generarJwt(idUsuario);
    res.status(200).json({ resultToken });
  } catch (err) {
    return res.status(500).json({ mensaje: "Error interno del servidor", err });
  }
};

module.exports = ctrlLogin;
