import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { app } from '../src/app.js';
import { userModel } from '../src/models/User.js';
import { petModel } from '../src/models/Pet.js';

const requester = supertest(app);

describe('Testing Adoption Router', function () {
    let testUser;
    let testPet;

    before(async function () {
        testUser = await userModel.create({
            first_name: "Test",
            last_name: "User",
            email: "test_adoption@correo.com",
            password: "123",
            role: "user",
            pets: []
        });

        testPet = await petModel.create({
            name: "Firulais Test",
            type: "dog",
            adopted: false
        });
    });

    after(async function () {
        await userModel.findByIdAndDelete(testUser._id);
        await petModel.findByIdAndDelete(testPet._id);
    });

    it('1. El endpoint POST /api/adoptions/:uid/:pid debe devolver 404 si el usuario no existe', async function () {
        const fakeUserId = new mongoose.Types.ObjectId();
        const response = await requester.post(`/api/adoptions/${fakeUserId}/${testPet._id}`);
        
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal("User not found");
    });

    it('2. El endpoint POST /api/adoptions/:uid/:pid debe devolver 404 si la mascota no existe', async function () {
        const fakePetId = new mongoose.Types.ObjectId();
        const response = await requester.post(`/api/adoptions/${testUser._id}/${fakePetId}`);
        
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal("Pet not found");
    });

    it('3. El endpoint POST /api/adoptions/:uid/:pid debe adoptar la mascota correctamente', async function () {
        const response = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
        
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Pet adopted successfully");

        const petInDb = await petModel.findById(testPet._id);
        expect(petInDb.adopted).to.be.true;
    });

    it('4. El endpoint POST /api/adoptions/:uid/:pid debe devolver 400 si la mascota ya está adoptada', async function () {
        const response = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
        
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Pet is already adopted");
    });
});