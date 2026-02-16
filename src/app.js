import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';
import { userModel } from './models/User.js';
import { petModel } from './models/Pet.js';

const app = express();
const PORT = 8080;

app.use(express.json());

const MONGO_URL = "mongodb://localhost:27017/entrega1Backend";

mongoose.connect(MONGO_URL)
    .then(() => console.log("Conexión a base de datos exitosa"))
    .catch(err => console.error("Error de conexión:", err));

app.use('/api/mocks', mocksRouter);

app.get('/api/users', async (req, res) => {
    const users = await userModel.find();
    res.json({ status: "success", payload: users });
});

app.get('/api/pets', async (req, res) => {
    const pets = await petModel.find();
    res.json({ status: "success", payload: pets });
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));