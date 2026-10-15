const express = require('express');
const { Pool } = require('pg');  // 👈 usamos pg en vez de mssql
const app = express();

app.use(express.json());
// 📌 READ - Obtener todos los registros
app.get('/invent', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invent');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 READ - Obtener un registro por CONDI
app.get('/invent/:CONDI', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invent WHERE condi = $1', [req.params.CONDI]);
    result.rows.length ? res.json(result.rows[0]) : res.status(404).json({ error: 'Inventario NO encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 CREATE - Insertar nuevo registro
app.post('/invent', async (req, res) => {
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

// 📌 UPDATE - Modificar registro existente
app.put('/invent/:CONDI', async (req, res) => {
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

// 📌 DELETE - Eliminar registro
app.delete('/invent/:CONDI', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM invent WHERE condi=$1', [req.params.CONDI]);
    result.rowCount ? res.json({ mensaje: 'Usuario eliminado' }) : res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor CRUD con PostgreSQL en http://localhost:3000');
});
