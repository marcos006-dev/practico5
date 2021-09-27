const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "comun",
  },
});

UsuariosSchema.methods.toJSON = function () {
  const { password, _id, __v, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};
module.exports = model("Usuarios", UsuariosSchema);
