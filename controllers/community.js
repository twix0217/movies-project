const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to display all movies and their users
router.get('/', async (req, res) => {
    try {
        // Find all users and populate their movies
        const users = await User.find().populate('movies');
        res.render('community/index.ejs', { users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Route to display a single movie's details
router.get('/movies/:movieId', async (req, res) => {
    try {
        console.log('Movie ID:', req.params.movieId); // Log the movie ID
        const user = await User.findOne({ 'movies._id': req.params.movieId }).populate('movies');
        if (!user) {
            console.log('User with the specified movie not found');
            return res.status(404).send('User with the specified movie not found');
        }
        const movie = user.movies.id(req.params.movieId);
        if (!movie) {
            console.log('Movie not found');
            return res.status(404).send('Movie not found');
        }
        res.render('community/show.ejs', { movie, user });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
