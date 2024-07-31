const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    genre: String,
    duration: Number,
    releaseDate: Date,
    director: String,
    description: String,
    rating: Number,
    imageURL: String,
    
  });

  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    movies: [movieSchema]
  });

const User = mongoose.model('User', userSchema);
const Movie = mongoose.model('Movie', movieSchema);
module.exports = User;