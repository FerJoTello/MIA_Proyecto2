import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

const app = express();
// settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(morgan('dev'));
app.use(cors());
//  Utilizados para comunicarse con el cliente 
//  por medio de json's y poder leerlos.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// routes
import indexRoutes from './routes/index'
app.use('/api', indexRoutes);

// accediendo a la carpeta uploads para almacenar imagenes
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;