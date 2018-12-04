const Ticket = require('../models/Ticket');
const Session = require('../models/Session');
const Place = require('../models/Place');
const User = require('../models/User');
const Film = require('../models/Film');

module.exports.getAll = async (req, res) =>{
    try{
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) =>{
    try{
        const ticket = await Ticket.findById(req.params.id);
        const session = await Session.findById(ticket.session);
        const place = await Place.findById(ticket.place);
        const user = await User.findById(ticket.user);
        const film = await Film.findById(session.film);
        res.status(200).json(
            {
                id: ticket.id,
                date: session.date,
                time: session.time,
                price: session.price,
                hall: session.hall,
                row_number: place.row_number,
                place_number: place.place_number,
                name: user.name,
                surname: user.surname,
                film: film.name
            }
        );
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) =>{
    try{
        await Ticket.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Удаление успешно'
        });
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) =>{
    try{
        const ticket = new Ticket({
            session: req.body.session,
            place: req.body.place,
            user: req.body.user 
        });
        await ticket.save();
        res.status(201).json(ticket);
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) =>{
    try{
        const ticket = await Ticket.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(ticket);
    } catch(e) {
        errorHandler(res, e)
    }
}