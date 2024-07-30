const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to display all movies and their users
router.get('/', async (req, res) => {
    try {
        // Find all users and populate their movies
        const users = await User.find().populate('movies');
        res.render('community/index', { users }); // Use the .ejs extension only if the view engine is not set to automatically resolve file extensions
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Route to display a single movie's details
router.get('/movies/:movieId', async (req, res) => {
    try {
        // Find the movie by ID
        const user = await User.findOne({ 'movies._id': req.params.movieId }).populate('movies');
        const movie = user.movies.id(req.params.movieId);
        res.render('community/show', { movie, user }); // Use the .ejs extension only if needed
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
