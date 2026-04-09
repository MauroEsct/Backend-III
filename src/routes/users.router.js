import { Router } from 'express';
import { userModel } from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ status: "success", payload: users });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get('/:uid', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.uid);
        if (!user) return res.status(404).json({ status: "error", message: "User not found" });
        res.json({ status: "success", payload: user });
    } catch (error) {
        res.status(400).json({ status: "error", message: "Invalid ID format" });
    }
});

export default router;