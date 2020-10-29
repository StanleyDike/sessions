const express = require ('express'); // to use express
const session = require('express-session');
const storeRouter = express.Router();
const Store = require('../models/Store');

// gets store item
// storeRouter.get('/:StoreItemId', async (req, res) => {
//     try {
//         const storeItem = await Store.findById(req.params.StoreItemId);
//
//         if (req.session.storeItems) {
//             req.session.storeItems = req.session.storeItems + 1;
//         }
//         else {
//             req.session.storeItems = 1;
//         }
//
//         res.send(storeItem);
//     } catch(err) {
//         res.sendStatus(404);
//     }
// });

//post a store item
storeRouter.post('/', async (req, res) => {
    const newStoreItem = new Store(req.body);

    try {
        const savedStoreItem = await newStoreItem.save();
        res.send(savedStoreItem);
    } catch(err) {
        res.sendStatus(404);
    }
});

module.exports = storeRouter;