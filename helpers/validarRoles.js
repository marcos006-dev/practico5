// validar los roles enviados por parametros

const validarRoles = (rolesPermitidos = [], usuarioRole) => {
  return rolesPermitidos.includes(usuarioRole);
};

module.exports = {
  validarRoles,
};
