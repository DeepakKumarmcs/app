require("dotenv").config();
const express = require('express');

// Connect
require('../db/db');

const genere = require('./Generes');

const app = express();
const port = 3000;
app.use(express.json())

app.post('/genere', (req, res) => {
    const newgenere = new genere({...req.body});
    newgenere.save().then(() => {
          res.send('New genere added successfully!')
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    })
})

app.get('/generes', (req, res) => {
   genere.find().then((generes) => {
        if (generes.length !== 0) {
              res.json(generes)
        } else {
            res.status(404).send('generes not found');
       }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
})
app.get('/genere/:id', (req, res) => {
    genere.findById(req.params.id).then((genere) => {
        if (genere) {
           res.json(genere)
        } else {
            res.status(404).send('generes not found');
        }
     }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})
app.delete('/genere/:id', (req, res) => {
    genere.findOneAndRemove(req.params.id).then((genere) 	=> {
        if (genere) {
             res.json('genere deleted Successfully!')
        } else {
            res.status(404).send('genere Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});
app.listen(port, () => {
     console.log(`Up and Running on port ${port} - This is genere service`);
})