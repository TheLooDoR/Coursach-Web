const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    name: {
        type: Schema.Types.String, 
        required: true,
    },
    duration: {
        type: Schema.Types.Number,
        required: true
    },
    age_rating: {
        type: Schema.Types.String,
        default: '0+'
    },
    language: {
        type: Schema.Types.String,
        required: true
    },
    img_source: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    genre: {
        ref: 'genres',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('films', filmSchema);