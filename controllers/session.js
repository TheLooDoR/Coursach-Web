const Session = require('../models/Session');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) =>{
    try{
        const sessions = await Session.find();
        res.status(200).json(sessions);
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) =>{
    try{
        const session = await Session.findById(req.params.id);

        res.status(200).json(session);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) =>{
    try{
        await Session.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Удаление успешно'
        });
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) =>{
    try{
        const session = new Session({
            date: req.body.date,
            price: req.body.price,
            film: req.body.film,
            hall: req.body.hall,
            time: req.body.time
        });
        await session.save();
        res.status(201).json(session);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) =>{
    try{
        const session = await Session.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(session);
    } catch(e) {
        errorHandler(res, e)
    }
}