const { check, validationResult } = require("express-validator");

const objValidaciones = {};

// Se retorna los campos a validar para la ruta de obtener un usuario
objValidaciones.reglasValidacionesApiObtenerUnUsuario = () => {
  return [
    check("id", "El id enviado no tiene un formato valido")
      .isMongoId()
      .trim()
      .escape(),
  ];
};

//Se retorna los campos a validar para la ruta de crear un usuario
objValidaciones.reglasValidacionesApiCrearUsuario = () => {
  return [
    check("email", "El email enviado tiene un formato incorrecto")
      .isEmail()
      .trim()
      .escape(),
    check("password", "El password enviado tiene un formato incorrecto")
      .trim()
      .escape()
      .isLength({ min: 8 }),
    check("role").custom((role) => {
      return ["administrador", "colaborador", "comun"].includes(role);
    }),
  ];
};

// Se retorna los campos a validar para la ruta de actualizar un usuario
objValidaciones.reglasValidacionesApiActualUsuario = () => {
  return [
    check("email", "El email enviado tiene un formato incorrecto")
      .isEmail()
      .trim()
      .escape(),
    check("password", "El password enviado tiene un formato incorrecto")
      .trim()
      .escape()
      .isLength({ min: 8 }),
    check("role", "El role enviado tiene un formato incorrecto").custom(
      (role) => {
        return ["administrador", "colaborador", "comun"].includes(role);
      }
    ),
    check("id", "El id enviado no tiene un formato valido")
      .isMongoId()
      .trim()
      .escape(),
  ];
};

// Se retorna los campos a validar para la ruta de cambiar estado de usuarios
objValidaciones.reglasValidacionesApiBorrarUsuario = () => {
  return [
    check(
      "activo",
      "Error invalido para el estado, solo puede enviar true o false"
    ).custom((estado) => {
      return ["true", "false"].includes(estado);
    }),
    check("id", "El id enviado no tiene un formato valido")
      .isMongoId()
      .trim()
      .escape(),
  ];
};

// Verifica las validaciones que vienen del request
objValidaciones.validarApiUsuarios = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = objValidaciones;
