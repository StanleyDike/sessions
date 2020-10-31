const express = require ('express'); // to use express
const session = require('express-session');
const storeRouter = express.Router();
const Store = require('../models/Store');

// get store item
storeRouter.get('/:StoreItemId', async (req, res) => {
    try {
        const foundItem = await Store.findById(req.params.StoreItemId);

        if (req.session.storeItems) {
            req.session.storeItems.push({'itemId': req.params.StoreItemId});
        }
        else {
            const storedItems = [];
            storedItems.push({'itemId': req.params.StoreItemId});
            req.session.storeItems = storedItems;
        }

        res.send(foundItem);
    } catch(err) {
        res.sendStatus(404);
    }
});

// Get the last 10 viewed items
storeRouter.get('/Recent/Viewed', async (req, res) => {
    try {
        const sessionStoreItems = req.session.storeItems;
        const recentStoreItems = [];

        if (sessionStoreItems.length < req.query.num) {
            res.sendStatus(404);
            return;

        } else {
            // const lastItems = sessionStoreItems.slice(Math.max(sessionStoreItems.length - req.query.num, 0));
            const lastItems = sessionStoreItems.slice(-req.query.num);
            for (let i = 0; i < lastItems.length ; i++) {
                const foundItem = await Store.findById(lastItems[i].itemId);
                recentStoreItems.push(foundItem);
            }
        }

        res.send(recentStoreItems);
    } catch(err) {
        res.sendStatus(404);
    }
});

//post a store item
storeRouter.post('/', async (req, res) => {
    try {
        const newStoreItem = new Store(req.body);
        const savedStoreItem = await newStoreItem.save();
        res.send(savedStoreItem);
    } catch(err) {
        res.sendStatus(404);
    }
});



module.exports = storeRouter;