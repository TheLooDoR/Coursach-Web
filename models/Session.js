const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    date: {
        type: Schema.Types.Date,
        default: Date.now
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    film: {
        ref: 'films',
        type: Schema.Types.ObjectId
    },
    hall: {
        ref: 'halls',
        type: Schema.Types.ObjectId
    },
    time: {
        type: Schema.Types.String,
        required: true
    }
});

module.exports = mongoose.model('sessions', sessionSchema);