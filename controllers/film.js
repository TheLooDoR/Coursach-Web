const Film = require('../models/Film');
const Genre = require('../models/Genre');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) =>{
    try{
        const films = await Film.find();
        res.status(200).json(films);
    } catch {
        res.status(400).json({
            message: 'Фильмы не найдены'
        });
    }
}

module.exports.getById = async (req, res) =>{
    const film_candidate = await Film.findOne({
        _id: req.params.id
    });
    const genre_id = film_candidate.genre;
    const genre_candidate = await Genre.findOne({
        _id: genre_id
    });
    if(film_candidate){
        res.status(200).json({
            name: film_candidate.name,
            duration: film_candidate.duration,
            age_rating: film_candidate.age_rating,
            language: film_candidate.language,
            img_source: film_candidate.img_source,
            description: film_candidate.description,
            genre: genre_candidate.name
        })
    }
    else{
        res.status(400).json({
            message: 'Фильм не найден'
        });
    }
}

module.exports.remove = async (req, res) =>{
    try{
        await Film.remove({_id: req.params.id});
        await Session.remove({film: req.params.id});
        res.status(200).json({
            message: 'Удаление успешно'
        });
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) =>{
    const film = new Film({
        name: req.body.name,
        duration: req.body.duration,
        age_rating: req.body.age_rating,
        language: req.body.language,
        img_source: req.body.img_source,
        description: req.body.description,
        genre: req.body.genre
    })
    try{
        await film.save();
        res.status(201).json(film);
    }catch(e){
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) =>{
    try{
        const film = await Film.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(film);
    } catch(e){
            console.log(e);
    }
}

