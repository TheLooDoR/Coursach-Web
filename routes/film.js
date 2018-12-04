const express = require('express');
const controller = require('../controllers/film');
const router = express.Router();
//localhost:5000/api/film
router.get('/', controller.getAll)
//localhost:5000/api/auth/film:id
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.patch('/:id', controller.update);

module.exports = router;