'use strict';

const fs = require('fs');

const file = fs.readFileSync('documents/Planilha.txt', 'utf-8');
const gb = 1000000000;
let totalMovies = [];
let newArray = new Array();

let movies = file.split('\n');
movies.splice(0, 1);

for (let i = 0; i < movies.length; i++) {
  movies[i] = movies[i].replace(/(\d\d\-\d\d\-\d\d\d\d)/, '| $1 |');
  movies[i] = movies[i].replace('.mxf', '.mxf |');
  movies[i] = movies[i].replace(/(\d{5,})/, '| $1');
}

for (let movie of movies) {
  movie = movie.split('|');
  totalMovies.push(movie);
}

for (let i = 0; i < totalMovies.length; i++) {
  let movie = totalMovies[i];
    newArray.push({
      name: movie[0].trim(),
      path: movie[2].trim(),
      date: movie[1].trim().replace(/-/g, '/'),
      size: `${Math.round((parseInt(movie[4])) / gb)}GB`.trim()
    })
}

fs.writeFileSync('documents/Films.json', JSON.stringify(newArray));
