const Place = require('../models/Place');
const Ticket = require('../models/Ticket');

module.exports.getAll = async (req, res) =>{
    try{
        const palces = await Place.find();
        res.status(200).json(palces);
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) =>{
    try{
        const place = await Place.findById(req.params.id);
        res.status(200).json(place);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) =>{
    try{
        await Place.remove({_id: req.params.id});
        await Ticket.remove({place: req.params.id});
        res.status(200).json({
            message: 'Удаление успешно'
        });
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) =>{
    try{
        const place = new Place({
            row_number: req.body.row_number,
            place_number: req.body.place_number 
        });
        await place.save();
        res.status(201).json(place);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) =>{
    try{
        const place = await Place.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(place);
    } catch(e) {
        errorHandler(res, e)
    }
}