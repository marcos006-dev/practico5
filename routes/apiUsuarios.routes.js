const router = require("express").Router();

// importacion de funcion de verificacion de json web token
const { validarJwt } = require("../middlewares/validarJwt");

// importacion de funciones de validaciones de roles
const {
  validarRolesApiObtenerUsuarios,
  validarRolesApiObtenerUnUsuario,
  validarRolesApiCrearUsuario,
  validarRolesApiActualUsuario,
  validarRolesApiBorrarUsuario,
} = require("../middlewares/validacionesRolesApiUsuarios");

// importacion de funciones de validacion de campos
const {
  reglasValidacionesApiObtenerUnUsuario,
  reglasValidacionesApiCrearUsuario,
  reglasValidacionesApiActualUsuario,
  reglasValidacionesApiBorrarUsuario,
  validarApiUsuarios,
} = require("../middlewares/validacionesCamposApiUsuarios");

// importacion de controladores
const {
  rutaGetApiUsuarios,
  rutaGetApiUnUsuario,
  rutaPostApiUsuario,
  rutaPutApiUsuario,
  rutaDeleteApiUsuario,
} = require("../controllers/apiUsuarios.controller");

// ruta para obtener a todos los usuarios
router.get(
  "/usuarios",
  [validarJwt, validarRolesApiObtenerUsuarios],
  rutaGetApiUsuarios
);

// ruta para obtener a un usuario
router.get(
  "/usuarios/:id",
  [
    validarJwt,
    validarRolesApiObtenerUnUsuario,
    reglasValidacionesApiObtenerUnUsuario(),
    validarApiUsuarios,
  ],
  rutaGetApiUnUsuario
);

// ruta para crear un usuario
router.post(
  "/usuarios/crear",
  [
    validarJwt,
    validarRolesApiCrearUsuario,
    reglasValidacionesApiCrearUsuario(),
    validarApiUsuarios,
  ],
  rutaPostApiUsuario
);

// ruta para actualizar un usuario
router.put(
  "/usuarios/:id",
  [
    validarJwt,
    validarRolesApiActualUsuario,
    reglasValidacionesApiActualUsuario(),
    validarApiUsuarios,
  ],
  rutaPutApiUsuario
);

// ruta para cambiar el estado de un usuario
router.put(
  "/usuarios/borrarUsuario/:id",
  [
    validarJwt,
    validarRolesApiBorrarUsuario,
    reglasValidacionesApiBorrarUsuario(),
    validarApiUsuarios,
  ],
  rutaDeleteApiUsuario
);

module.exports = router;
