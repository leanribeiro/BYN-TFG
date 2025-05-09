import express from 'express';
import dotenv from 'dotenv';
import dataSource from './data-source';
import routes from './routes/index';
import cors from 'cors';  
import { errorHandler } from './middlewares/errorHandler'; 


dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json());

dataSource.initialize()
  .then(() => {
    console.log('✅ Conexión exitosa a la base de datos MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Usar las rutas
app.use('/api', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
