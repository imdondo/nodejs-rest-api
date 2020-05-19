const Note = require('../models/note.model');
let notes=require("../models/notes.json"); 
var fs = require("fs");

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Note topic can not be empty"
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
   
};

exports.findAll = (req, res) => {
    res.json(notes);
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    var currNote = notes.filter(function(note){
        if(note.id == req.params.noteId){
           return true;
        }
     });
     
     if(currNote.length == 1){
        res.json(currNote[0])
     } else {
        res.status(404);  //Set status to 404 as movie was not found
        res.json({message: "Not Found"});
     }
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.description || !req.body.topic) {
    //     return res.status(400).send({
    //         message: "Note that description or topic can not be empty"
    //     });
    // }
//    find the old note that is to be replaced

    // Create a Note
    console.log(req.body.topic);
    console.log(req.body.description);
let note = { 
    id: req.params.noteId, 
    topic: req.body.topic , //or have to set old values from old object
    description: req.body.description //or have to set old values from old object
}; 
// Save Note in the database
    notes.push(note);
     //Check if all fields are provided and are valid:
      // Reading isbn from the URL
    const noteId = req.params.noteId;
    const newNote = req.body;

   // STEP 3: Writing to a file 

// fs.writeFile("../models/notes.json", JSON.stringify(notes), err => { 
  fs.writeFile("./models/notes.json", JSON.stringify(notes), err => {    
    // Checking for errors 
    if (err) throw err;  
    res.send('Note is edited');
    console.log("Done writing"); // Success 
}); 
// res.send(note);  
 
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    
     if(!req.params.noteId){
         return ;
     }
    
     // Reading isbn from the URL
     const noteId = req.params.noteId;

     // Remove item from the books array
     notes = notes.filter(i => {
         if (i.id !== noteId) {
             return true;
         }
         return false;
     });

    //  Remove Note in the database
    notes.splice(noteId,1);

   // STEP 3: Writing to a file 

// fs.writeFile("../models/notes.json", JSON.stringify(notes), err => { 
  fs.writeFile("./models/notes.json", JSON.stringify(notes), err => {    
    // Checking for errors 
    if (err) throw err;  
    console.log("Done Deleting"); // Success 
}); 
 console.log(notes.length);
     res.send('Note is deleted');
};

