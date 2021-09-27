const express = require("express");
const morgan = require("morgan");
require("./conexion");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 4000);

app.use(require("./routes/login.routes"));

app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/api", require("./routes/apiUsuarios.routes"));

app.listen(app.get("port"), () => {
  console.log(`Server is Listening on ${app.get("port")}`);
});
