const Genre = require('../models/Genre');
const Film = require('../models/Film');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) =>{
    try{
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch {
        res.status(400).json({
            message: 'Жанры не найдены'
        });
    }
}

module.exports.getById = async (req, res) =>{
    try{
        const genre = await Genre.findById(req.params.id);
        res.status(200).json(genre);
    }
    catch (e){
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) =>{
    try{
        await Genre.remove({_id: req.params.id});
        await Film.remove({genre: req.params.id});
        res.status(200).json({
            message: 'Удаление успешно'
        });
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) =>{
    const genre = new Genre({
        name: req.body.name,
    })
    try{
        await genre.save();
        res.status(201).json(genre);
    }catch(e){
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) =>{
    try{
        const genre = await Genre.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(genre);
    } catch(e){
        errorHandler(res, e)
    }
}