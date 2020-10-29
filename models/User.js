const mongoose = require('mongoose');
require('mongoose-type-email');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
    },
    cart: [
        {
            storeItemId: {
                type: String, // store as a string to pass _id from storeItem collection
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
            },
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);