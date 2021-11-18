require("dotenv").config();
const express = require('express');

// Connect
require('../config/dbConnection');

const movie = require('./movies');

const app = express();
const port = process.env.PORT || 9000;
app.use(express.json())

app.post('/movie', (req, res) => {
    const newmovie = new movie({...req.body});
    newmovie.save().then(() => {
          res.send('New movie added successfully!')
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    })
})

app.get('/movies', (req, res) => {
   movie.find().then((movies) => {
        if (movies.length !== 0) {
              res.json(movies)
        } else {
            res.status(404).send('movies not found');
       }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
})
app.get('/movie/:id', (req, res) => {
    movie.findById(req.params.id).then((movie) => {
        if (movie) {
           res.json(movie)
        } else {
            res.status(404).send('movies not found');
        }
     }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})
app.delete('/movie/:id', (req, res) => {
    movie.findOneAndRemove(req.params.id).then((movie) 	=> {
        if (movie) {
             res.json('movie deleted Successfully!')
        } else {
            res.status(404).send('movie Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});
app.listen(port, () => {
     console.log(`Up and Running on port ${port} - This is movie service`);
})