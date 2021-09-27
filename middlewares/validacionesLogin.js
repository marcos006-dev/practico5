const { body, validationResult } = require("express-validator");

const reglasValidacionesLogin = () => {
  return [
    body("email", "El email enviado no es valido")
      .isEmail()
      .normalizeEmail()
      .trim()
      .escape(),
    body("password", "El password enviado no es valido")
      .isLength({ min: 5 })
      .trim()
      .escape(),
  ];
};

const validarLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  reglasValidacionesLogin,
  validarLogin,
};
