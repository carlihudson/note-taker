// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();


const { notes } = require('./db/db.json');
const { request } = require('http');


const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notes));


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

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
