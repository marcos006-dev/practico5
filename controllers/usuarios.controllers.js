const Usuarios = require("../models/Usuarios.model");
const ctrlUsuarios = {};

ctrlUsuarios.rutaGetUsuarios = async (req, res) => {
  try {
    const busquedaUsuarios = await Usuarios.find();
    res.status(200).json({
      busquedaUsuarios,
    });
  } catch (error) {
    res.status(401).json({ mensaje: "error al obtener a los usuarios", error });
  }
};

ctrlUsuarios.rutaGetUnUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const busquedaUnUsuario = await Usuarios.findOne({ _id: id });
    res.status(200).json({
      busquedaUnUsuario,
    });
  } catch (error) {
    res.status(401).json({ mensaje: "error al obtener el usuario", error });
  }
};

ctrlUsuarios.rutaPostUsuario = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const nuevoUsuario = new Usuarios({
      email,
      password,
      role,
    });

    await nuevoUsuario.save();
    res.status(200).json("Usuario creado correctamente");
  } catch (error) {
    res.status(401).json({ mensaje: "error al crear el usuario", error });
  }
};

ctrlUsuarios.rutaPutUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;
  try {
    await Usuarios.findByIdAndUpdate(id, {
      email,
      password,
      role,
    });

    res.status(200).json("Usuario actualizado correctamente");
  } catch (error) {
    res.status(401).json({ mensaje: "error al actualizar el usuario", error });
  }
};

ctrlUsuarios.rutaDeleteUsuario = async (req, res) => {
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

module.exports = ctrlUsuarios;
