const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: {
        type: Schema.Types.String, 
        required: true,
    },
});

module.exports = mongoose.model('genres', genreSchema);