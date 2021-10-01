const Usuarios = require("../models/Usuarios.model");
const bcrypt = require("bcryptjs");
const ctrlApiUsuarios = {};

// controlador para obtener a todos los usuarios
ctrlApiUsuarios.rutaGetApiUsuarios = async (req, res) => {
  try {
    const busquedaApiUsuarios = await Usuarios.find();
    return res.status(200).json({
      busquedaApiUsuarios,
    });
  } catch (error) {
    res.status(401).json({ mensaje: "error al obtener a los usuarios", error });
  }
};

// controlador para obtener a un usuario
ctrlApiUsuarios.rutaGetApiUnUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const busquedaApiUnUsuario = await Usuarios.findOne({ _id: id });
    return res.status(200).json({
      busquedaApiUnUsuario,
    });
  } catch (error) {
    res.status(401).json({ mensaje: "error al obtener el usuario", error });
  }
};

// controlador para crear a un usuario
ctrlApiUsuarios.rutaPostApiUsuario = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncriptado = bcrypt.hashSync(password, salt);
    // console.log(passwordEncriptado);
    const nuevoUsuario = new Usuarios({
      email,
      password: passwordEncriptado,
      role,
    });
    // nuevoUsuario.password = passwordEncriptado;
    await nuevoUsuario.save();
    res.status(200).json("Usuario creado correctamente");
  } catch (error) {
    res.status(401).json({ mensaje: "error al crear el usuario", error });
  }
};

// controlador para obtener actualizar a un usuario
ctrlApiUsuarios.rutaPutApiUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncriptadoEditar = bcrypt.hashSync(password, salt);
    await Usuarios.findByIdAndUpdate(id, {
      email,
      password: passwordEncriptadoEditar,
      role,
    });

    res.status(200).json("Usuario actualizado correctamente");
  } catch (error) {
    res.status(401).json({ mensaje: "error al actualizar el usuario", error });
  }
};

// controlador para obtener cambiar el estado de un usuario
ctrlApiUsuarios.rutaDeleteApiUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuarios.findByIdAndUpdate(id, {
      activo: false,
    });

    res.status(200).json("Usuario borrado correctamente");
  } catch (error) {
    res.status(401).json({ mensaje: "error al borrar el usuario", error });
  }
};

module.exports = ctrlApiUsuarios;
