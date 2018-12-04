//express
const express = require('express');
//mongoose
const mongoose = require('mongoose');
const passport = require('passport');
//bodyparser
const bodyParser = require('body-parser');
//cors & morgan
const cors = require('cors');
const morgan = require('morgan');
//routes
const authRoutes = require('./routes/auth.js');
const filmRoutes = require('./routes/film.js');
const orderRoutes = require('./routes/order.js');
const genreRoutes = require('./routes/genre');
const hallRoutes = require('./routes/hall');
const placeRoutes = require('./routes/place');
const ticketRoutes = require('./routes/ticket');
const sessionRoutes = require('./routes/session');
const app = express();
//db connection
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));


app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(morgan('dev'));
app.use(cors()); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/film', filmRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/hall', hallRoutes);
app.use('/api/place', placeRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/session', sessionRoutes);

module.exports = app;