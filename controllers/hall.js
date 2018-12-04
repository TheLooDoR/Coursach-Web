const Hall = require('../models/Hall');
const Session = require('../models/Session');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) =>{
    try{
        const halls = await Hall.find();
        res.status(200).json(halls);
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) =>{
    try{
        const hall = await Hall.findById(req.params.id);
        res.status(200).json(hall);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) =>{
    try{
        await Hall.remove({_id: req.params.id});
        await Session.remove({hall: req.params.id});
        res.status(200).json({
            message: 'Удаление успешно'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) =>{
    try{
        const hall = new Hall({
            place_quantity: req.body.place_quantity,
            row_quantity: req.body.row_quantity
        });
        await hall.save();
        res.status(201).json(hall);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) =>{
    try{
        const hall = await Hall.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(hall);
    } catch(e) {
        errorHandler(res, e)
    }
}