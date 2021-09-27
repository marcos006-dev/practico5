const {
  rutaGetUsuarios,
  rutaPostUsuario,
  rutaPutUsuario,
  rutaDeleteUsuario,
  rutaGetUnUsuario,
} = require("../controllers/usuarios.controllers");

const router = require("express").Router();

router.get("/", rutaGetUsuarios);
router.get("/:id", rutaGetUnUsuario);

router.post("/", rutaPostUsuario);

router.put("/:id", rutaPutUsuario);

router.put("/borrarUsuario/:id", rutaDeleteUsuario);

module.exports = router;
