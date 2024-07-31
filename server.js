const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');


const authController = require('./controllers/auth.js');
const moviesController = require('./controllers/movies.js');
const communityController = require('./controllers/community');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT || '3000';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passUserToView);



// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/movies`);
  } else {
    res.render('index.ejs');
  }
});
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/movies', moviesController);
app.use('/community', communityController);
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
