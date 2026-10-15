const express = require('express');
const app = express();
const inventarioRoutes = require('./routes/inventario');

app.use(express.json());
app.use('/usuarios', inventarioRoutes);

app.listen(3000, () => {
  console.log('Servidor CRUD con PostgreSQL en http://localhost:3000');
});