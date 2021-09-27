const router = require("express").Router();
const { rutaAutentificar } = require("../controllers/login.controller");
const {
  reglasValidacionesLogin,
  validarLogin,
} = require("../middlewares/validacionesLogin");

router.post(
  "/autentificar",
  reglasValidacionesLogin(),
  validarLogin,
  rutaAutentificar
);

module.exports = router;
