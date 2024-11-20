import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
  })
);

app.use('/auth', authRoutes);
app.use('/api', taskRoutes); 
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Conectado a la base de datos');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(error => console.log('Error al conectar a la base de datos:', error));
