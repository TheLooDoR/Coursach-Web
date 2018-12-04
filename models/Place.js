const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    row_number: {
        type: Schema.Types.Number,
        required: true,
    },
    place_number: {
        type: Schema.Types.Number,
        required: true
    }
});

module.exports = mongoose.model('places', placeSchema);