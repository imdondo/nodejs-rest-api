const express = require('express');
const bodyParser = require('body-parser');
const Note = require('./models/note.model');
var fs = require("fs");
const notes = require("./models/notes.json"); 
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// define a simple route
// app.get('/api/notes', (req, res) => { This one works
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
// define a parameterised route
app.get('/api/notes:id', (req, res) => {
    try{
        const foundNote = notes.find(note => note.id === Number(req.params.id));
        if (!foundNote) {
            const err = new Error('Note not found');
            err.status = 404;
            throw err;
          }
          res.json(foundNote);
    }catch{

    }
   
});
// updating a single note
app.put('/api/notes:id', (req, res) => {
    // validate request before anything else
    // Validate Request
    console.log(req);
    console.log(req).body;
    if(!req.body.description) {
        return res.status(400).send({
            message: "Note description can not be empty"
        });
    }
    try{
        let foundNote = notes.find(note => note.id === Number(req.params.id));
        // res.json(notes);
        if (!foundNote) {
            const err = new Error('Note not found');
            err.status = 404;
            throw err;
          }
    }catch{
        
    }
//    let newNote.topic =foundNote
const newNote = {
    id: req.body.id,
    topic: req.body.topic,
    description: req.body.description
  };

     notes.push(newNote);
      res.json(newNote);
});

// create a new note using post method
app.post('/api/notes', (req, res) => {
   // Validate request
   if(!req.body.description) {
    return res.status(400).send({
        message: "Note description can not be empty"
    });
}

// Create a Note

let note = { 
    id: notes.length+1, 
    topic: req.body.topic, 
    description: req.body.description
}; 
// Save Note in the database


// STEP 2: Adding new data to users object 
notes.push(note); 
   
// STEP 3: Writing to a file 
fs.writeFile("./models/notes.json", JSON.stringify(notes), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log("Done writing"); // Success 
}); 
res.send(note);

});
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
