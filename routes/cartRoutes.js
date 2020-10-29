const express = require ('express');
const cartRouter = express.Router();

const User= require('../models/User');

// Post an Item To The Users Cart
cartRouter.post('/:UserId/cartItem', async(req, res) => {
    try {
        const foundUser = await User.findById(req.params.UserId);
        await foundUser.cart.push(req.body);
        await foundUser.save();
        res.send(foundUser);
    } catch(err) {
        res.sendStatus(404);
    }
});

//Delete an Item From The Users Cart
cartRouter.delete('/:UserId/cartItem/:cartItemId', async (req, res) => {
    try {
        await User.update({_id: req.params.UserId},
            {$pull : {cart : {_id: req.params.cartItemId}}},
            {multi: true});
        const foundUser = await User.findById(req.params.UserId);
        res.send(foundUser);
    } catch(err) {
        res.sendStatus(404);
    }
});

module.exports = cartRouter;

