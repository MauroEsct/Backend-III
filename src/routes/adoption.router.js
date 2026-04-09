import { Router } from 'express';
import { userModel } from '../models/User.js';
import { petModel } from '../models/Pet.js';

const router = Router();

router.post('/:uid/:pid', async (req, res) => {
    try {
        const { uid, pid } = req.params;

        // 1. Buscar Usuario
        const user = await userModel.findById(uid);
        if (!user) return res.status(404).json({ status: "error", message: "User not found" });

        // 2. Buscar Mascota
        const pet = await petModel.findById(pid);
        if (!pet) return res.status(404).json({ status: "error", message: "Pet not found" });

        // 3. Verificar si ya está adoptada
        if (pet.adopted) {
            return res.status(400).json({ status: "error", message: "Pet is already adopted" });
        }

        // 4. Actualizar base de datos
        user.pets.push(pet._id);
        pet.adopted = true;

        await user.save();
        await pet.save();

        res.json({ status: "success", message: "Pet adopted successfully" });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default router;