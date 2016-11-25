const mongoose = require('mongoose');
const db = require('./app/config/database.js');
mongoose.connect(db);

const Superhero = require('./app/models/superhero');

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('app'));

app.use(cookieParser());
app.use(session({secret: 'shhhhitsasecret', saveUninitialized: true, resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// hbs
app.set('views', path.join(__dirname,'app/views'));  
app.engine('hbs', exphbs({extname: 'hbs'}));
app.set('view engine', 'hbs');


const port = process.env.PORT || 8000;

require('./app/config/passport');

const routes = require('./app/routes');

app.use('/', routes);

app.listen(port);
console.log('We make stuff happen on port ' + port);
