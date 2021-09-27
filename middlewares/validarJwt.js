const jwt = require("jsonwebtoken");
const Usuarios = require("../models/Usuarios.model");

require("dotenv").config();

const validarJwt = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).json("token no valido (debe enviar un token)");
  }
  try {
    const { idUsuario } = await jwt.verify(token, process.env.PRIVATE_KEY);
    const datosUsuarios = await Usuarios.find({ _id: idUsuario, activo: true });

    if (datosUsuarios.length === 0) {
      return res.status(400).json("token no valido (usuario no activo)");
    }

    req.usuarioRole = datosUsuarios[0].role;

    next();
  } catch (error) {
    return res.status(400).json("token no valido (fallo verificacion)");
  }
};

module.exports = {
  validarJwt,
};
