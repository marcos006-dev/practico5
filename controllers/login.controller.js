// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/generarJwt");
const Usuarios = require("../models/Usuarios.model");
require("dotenv").config();
const ctrlLogin = {};

ctrlLogin.rutaAutentificar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultUsuario = await Usuarios.find({
      email: email,
    });

    if (resultUsuario.length === 0) {
      return res.status(401).json({
        mensage: "Credenciales Invalidas (no se encontro coincidencia)",
      });
    }
    // console.log(resultUsuario[0].activo);
    if (!resultUsuario[0].activo) {
      return res.status(401).json({
        mensage: "Credenciales Invalidas (usuario no activo)",
      });
    }
    // console.log(resultUsuario[0].password);
    const resultPassword = bcrypt.compareSync(
      password,
      resultUsuario[0].password
    );

    if (!resultPassword) {
      return res.status(401).json({
        mensage: "Credenciales Invalidas (contraseña mal ingresada)",
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
