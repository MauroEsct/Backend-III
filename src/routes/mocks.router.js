import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { userModel } from '../models/User.js';
import { petModel } from '../models/Pet.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(10);
    res.send({ status: "success", payload: pets });
});

router.get('/mockingusers', async (req, res) => {
    const users = await generateMockUsers(50);
    res.send({ status: "success", payload: users });
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;
    try {
        const mockedUsers = await generateMockUsers(users || 0);
        const mockedPets = generateMockPets(pets || 0);

        if (mockedUsers.length > 0) await userModel.insertMany(mockedUsers);
        if (mockedPets.length > 0) await petModel.insertMany(mockedPets);

        res.send({ 
            status: "success", 
            message: `Registros insertados: ${users} usuarios y ${pets} mascotas.` 
        });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.delete('/dropAll', async (req, res) => {
    try {
        await userModel.deleteMany({});
        await petModel.deleteMany({});
        res.send({ status: "success", message: "Base de datos vaciada" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

export default router;