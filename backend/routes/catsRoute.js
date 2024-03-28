import express from 'express';
import { Cat } from '../models/catModel.js'

const router = express.Router();

// Route for save a new Cat
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.owner ||
            !request.body.age
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, owner, age',
            })
        }
        
        const newCat = {
            name: request.body.name,
            owner: request.body.owner,
            age: request.body.age,
        };
        
        const cat = await Cat.create(newCat);
        
        return response.status(201).send(cat);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

// Route for get all cat from db
router.get('/', async (request, response) => {
    try {
        const cats = await Cat.find({});

        return response.status(200).json({
            count: cats.length,
            data: cats
        });
    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

// Route for get one cat from db by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const cat = await Cat.findById(id);

        return response.status(200).json(cat);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

// Route for update a cat
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.owner ||
            !request.body.age
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, owner, age'
            });
        }

        const { id } = request.params;

        const result = await Cat.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: 'Cat not found'});
        }

        return response.status(200).send({message: 'Cat updated successfuly'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for delete a cat
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Cat.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: 'Cat not found'})
        }

        return response.status(200).send({message: 'Cat deleted successfuly'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

export default router;