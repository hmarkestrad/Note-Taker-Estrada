// Defines Constructors
const path = require('path');
const fs = require('fs')
var uniqid = require('uniqid');

// Routes
module.exports = (app) => {

  // Get '/api/notes'
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // Post '/api/notes' 
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    // Body for note
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      // Create an id for note
      id: uniqid(),
    };
    // Pushes note
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
  });

  // Delete '/api/notes/:id'
  app.delete('/api/notes/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  })
};