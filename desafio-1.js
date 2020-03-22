'use strict';

const fs = require('fs');

const file = fs.readFileSync('Planilha.txt', 'utf-8');

let movies = file.split('\n');
movies.splice(0, 1);

for (let i = 0; i < movies.length; i++) {
  movies[i] = movies[i].replace(/(\d\d\-\d\d\-\d\d\d\d)/, '| $1 |');
  movies[i] = movies[i].replace('.mxf', '.mxf |');
  movies[i] = movies[i].replace(/(\d{5,})/, '| $1');
}

for (let movie of movies) {
  movie = movie.split('|');
  for (let m of movie) {
    m = m.trim();
  }
  console.log(movie);
}