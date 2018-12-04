const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    session: {
        ref: 'sessions',
        type: Schema.Types.ObjectId
    },
    place: {
        ref: 'places',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('tickets', ticketSchema);