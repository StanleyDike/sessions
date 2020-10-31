const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const Store = require('./models/Store');

const storeRoutes = require('./routes/storeRoutes');

const router = express.Router();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    app.use(session({
        secret: 'some secret',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection, collection: 'sessions'}),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }));
    // app.use(router);
    app.use('/StoreItem', storeRoutes);
    console.log('Connected to DB!');
});

// router.get('/StoreItem/:StoreItemId', async (req, res) => {
//     try {
//         const foundItem = await Store.findById(req.params.StoreItemId);
//
//         if (req.session.storeItems) {
//             req.session.storeItems.push({'itemId': req.params.StoreItemId});
//         }
//         else {
//             const storedItems = [];
//             storedItems.push({'itemId': req.params.StoreItemId});
//             req.session.storeItems = storedItems;
//         }
//
//         res.send(foundItem);
//     } catch(err) {
//         res.sendStatus(404);
//     }
// });

// router.get('/StoreItem/Recent', async (req, res) => {
//     try {
//         const lastItems = req.session.storeItems;
//
//        lastItems.slice(Math.max(lastItems.length - req.query.num, 0));
//
//       const recentStoreItems = [];
//       for (let i = 0; i < req.query.num ; i++) {
//           const foundItem = await Store.findById(lastItems[i].itemId);
//           recentStoreItems.push(foundItem);
//       }
//       res.send(recentStoreItems);
//     } catch(err) {
//       res.sendStatus(404);
//     }
// });

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/cart', cartRoutes);


// app.use('/StoreItem', storeRoutes);

app.listen(3000);





