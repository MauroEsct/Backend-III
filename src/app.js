import express from 'express';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import adoptionRouter from './routes/adoption.router.js';
import { petModel } from './models/Pet.js'; 

export const app = express(); 
const PORT = 8080;

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/entrega1Backend";

mongoose.connect(MONGO_URL)
    .then(() => console.log("Conexión a base de datos exitosa"))
    .catch(err => console.error("Error de conexión:", err));

// Configuración de Swagger a prueba de errores de formato
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API de Adopción de Mascotas',
            description: 'Documentación oficial del módulo de usuarios y adopciones',
            version: '1.0.0',
        },
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        first_name: { type: "string" },
                        last_name: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" },
                        role: { type: "string", enum: ["user", "admin"] },
                        pets: { type: "array", items: { type: "string" } }
                    }
                }
            }
        },
        paths: {
            "/api/users": {
                get: {
                    summary: "Obtiene todos los usuarios",
                    tags: ["Users"],
                    responses: {
                        "200": { description: "Lista de usuarios obtenida exitosamente" }
                    }
                }
            },
            "/api/users/{uid}": {
                get: {
                    summary: "Obtiene un usuario por ID",
                    tags: ["Users"],
                    parameters: [
                        { name: "uid", in: "path", required: true, schema: { type: "string" }, description: "ID del usuario a buscar" }
                    ],
                    responses: {
                        "200": { description: "Usuario encontrado" },
                        "404": { description: "Usuario no encontrado" }
                    }
                }
            }
        }
    },
    apis: [],
};

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter); 
app.use('/api/adoptions', adoptionRouter); 

app.get('/api/pets', async (req, res) => {
    const pets = await petModel.find();
    res.json({ status: "success", payload: pets });
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));