const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Display the movies of the currently logged-in user
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('movies/index.ejs', {
      movies: currentUser.movies,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Route to display a form for adding a new movie
router.get('/new', async (req, res) => {
  res.render('movies/new.ejs');
});

// Handle adding a new movie
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    req.body.releaseDate = new Date(req.body.releaseDate);
    currentUser.movies.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Display details of a specific movie
router.get('/:movieId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render('movies/show.ejs', {
      movie,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete a specific movie
router.delete('/:movieId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.movies.id(req.params.movieId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Display a form to edit a specific movie
router.get('/:movieId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render('movies/edit.ejs', {
      movie,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update a specific movie
router.put('/:movieId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // movie.name = req.body.name;
    // movie.genre = req.body.genre;
    // movie.releaseDate = new Date(req.body.releaseDate);
    // movie.director = req.body.director;
    // movie.description = req.body.description;
    // movie.rating = req.body.rating;

    movie.set(req.body)

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



module.exports = router;
