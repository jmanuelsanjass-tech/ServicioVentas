require('dotenv').config();
const express = require('express');
const app = express();
const inventarioRoutes = require('./routes/inventario');

app.use(express.json());
app.use('/invent', inventarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor CRUD con PostgreSQL en http://localhost:${PORT}`);
});
