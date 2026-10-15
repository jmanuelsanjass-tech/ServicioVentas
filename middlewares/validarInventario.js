// middlewares/validarInventario.js
function validarInventario(req, res, next) {
  const { CONDI, DESCRIP, PREC_COST, PREC_VENT } = req.body;

  // Validar campos obligatorios
  if (!CONDI || !DESCRIP || PREC_COST == null || PREC_VENT == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validar tipos de datos
  if (typeof CONDI !== 'string' || typeof DESCRIP !== 'string') {
    return res.status(400).json({ error: 'CONDI y DESCRIP deben ser texto' });
  }

  if (isNaN(PREC_COST) || isNaN(PREC_VENT)) {
    return res.status(400).json({ error: 'PREC_COST y PREC_VENT deben ser números' });
  }

  // Validar valores positivos
  if (PREC_COST <= 0 || PREC_VENT <= 0) {
    return res.status(400).json({ error: 'Los precios deben ser mayores a 0' });
  }

  // Si todo está bien, continuar
  next();
}

module.exports = validarInventario;
