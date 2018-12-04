const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) =>{
    const candidate = await User.findOne({login: req.body.login});

    if(candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
            //Генерация токена, пароли совпали
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Неверный пароль'
            });
        }
    } else {
        //Пользователь не зарегестрирован
        res.status(404).json({
            message: 'Пользователь с таким логином не найден'
        });
    }
}

module.exports.register = async  (req, res) => {
    const candidate = await User.findOne({login: req.body.login});

    if (candidate){
        //пользователь существует
        res.status(409).json({
        message: 'Данный пользователь существует'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password
        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name,
            surname: req.body.surname
        })
        try{
            await user.save();
            res.status(201).json(user);
        }catch(e){
           errorHandler(res, e)
        }
        
    }
}