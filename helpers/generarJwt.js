const jwt = require("jsonwebtoken");

// retorna una el token generado con el id del usuario
const generarJwt = (idUsuario) => {
  const payload = { idUsuario };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.PRIVATE_KEY, (err, token) => {
      if (err) {
        reject("error al crear el token" + err);
      }
      resolve(token);
    });
  });
};

module.exports = {
  generarJwt,
};
