// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();

// file where written notes will go
const { notes } = require('./db/db.json');


const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// request to go to notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notes));

// pushes content of db.json into the db.json file and assigns a random id
app.post('/api/notes', (req, res) => {
    const body = req.body
    const postObj = {"id": uid(),
    "title": req.body.title, 
    "text": req.body.text}
    notes.push(postObj)

    console.log(body)
    res.json(notes);
}
);

// if anything besides /notes is typed in bar, user will be taken to the home page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
