const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.DB_ROUTE)
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((error) => {
    console.log(error);
  });
