const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const validarInventario = require('../middlewares/validarInventario');

// GET todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invent');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por CONDI
router.get('/:CONDI', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invent WHERE condi = $1', [req.params.CONDI]);
    result.rows.length ? res.json(result.rows[0]) : res.status(404).json({ error: 'Inventario NO encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST nuevo
router.post('/',validarInventario, async (req, res) => {
  try {
    const { CONDI, DESCRIP, PREC_COST, PREC_VENT } = req.body;
    const result = await pool.query(
      'INSERT INTO invent (condi, descrip, prec_cost, prec_vent) VALUES ($1, $2, $3, $4) RETURNING *',
      [CONDI, DESCRIP, PREC_COST, PREC_VENT]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar
router.put('/:CONDI', validarInventario,async (req, res) => {
  try {
    const { DESCRIP, PREC_COST, PREC_VENT } = req.body;
    const result = await pool.query(
      'UPDATE invent SET descrip=$1, prec_cost=$2, prec_vent=$3 WHERE condi=$4 RETURNING *',
      [DESCRIP, PREC_COST, PREC_VENT, req.params.CONDI]
    );
    result.rows.length ? res.json(result.rows[0]) : res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:CONDI', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM invent WHERE condi=$1', [req.params.CONDI]);
    result.rowCount ? res.json({ mensaje: 'Usuario eliminado' }) : res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
