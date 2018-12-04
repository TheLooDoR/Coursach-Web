const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hallSchema = new Schema({
    place_quantity: {
        type: Schema.Types.Number,
        default: 10 
    },
    row_quantity: {
        type: Schema.Types.Number,
        default: 4
    }
});

module.exports = mongoose.model('halls', hallSchema);