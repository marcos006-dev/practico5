const { validarRoles } = require("../helpers/validarRoles");

const objRoles = {};

// Validar roles para la ruta de obtener usuarios
objRoles.validarRolesApiObtenerUsuarios = (req, res, next) => {
  if (
    !validarRoles(["administrador", "colaborador", "comun"], req.usuarioRole)
  ) {
    return res.status(401).json("No posee los permisos necesarios");
  }
  next();
};

// Validar roles para la ruta de obtener un usuario
objRoles.validarRolesApiObtenerUnUsuario = (req, res, next) => {
  if (
    !validarRoles(["administrador", "colaborador", "comun"], req.usuarioRole)
  ) {
    return res.status(401).json("No posee los permisos necesarios");
  }
  next();
};

// Validar roles para la ruta de crear un usuario
objRoles.validarRolesApiCrearUsuario = (req, res, next) => {
  if (!validarRoles(["administrador"], req.usuarioRole)) {
    return res.status(401).json("No posee los permisos necesarios");
  }
  next();
};

// Validar roles para la ruta de actualizar un usuario
objRoles.validarRolesApiActualUsuario = (req, res, next) => {
  if (!validarRoles(["administrador"], req.usuarioRole)) {
    return res.status(401).json("No posee los permisos necesarios");
  }
  next();
};

// Validar roles para la ruta de borrar un usuario
objRoles.validarRolesApiBorrarUsuario = (req, res, next) => {
  if (!validarRoles(["administrador"], req.usuarioRole)) {
    return res.status(401).json("No posee los permisos necesarios");
  }
  next();
};
module.exports = objRoles;
