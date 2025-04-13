import express from 'express';
import dotenv from 'dotenv';
import dataSource from './data-source';
import routes from './routes/index';
dotenv.config();

const app = express();
app.use(express.json());

// Establecer la conexión con la base de datos
dataSource.initialize()
  .then(() => {
    console.log('✅ Conexión exitosa a la base de datos MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Usar las rutas
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
