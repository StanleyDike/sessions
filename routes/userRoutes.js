const express = require ('express'); // to use express
const userRouter = express.Router(); // to make user routes

const User = require('../models/User');

// Get All Users
userRouter.get('/', async (req,res) => {
    try {
        const allUsers = await User.find();
        res.send(allUsers);
    } catch(err) {
        res.sendStatus(404);
    }
});

// Get a Specific User
userRouter.get('/:UserId', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.UserId);
        res.send(foundUser);
    } catch(err) {
        res.sendStatus(404);
    }
});

// Post a New User
userRouter.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch(err) {
        res.sendStatus(404);
    }
});

// Get a Specific Users Cart and Show Their Cart Items
userRouter.get('/:UserId/cart', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.UserId);
        res.send(foundUser.cart);
    } catch(err) {
        res.sendStatus(404);
    }
});

// Empty The Users Cart
userRouter.delete('/:UserId/cart', async (req, res) => {
    try {
        await User.update({_id: req.params.UserId}, {$pull: {cart: {$exists: true}}});
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(404);
    }
});

module.exports = userRouter;

