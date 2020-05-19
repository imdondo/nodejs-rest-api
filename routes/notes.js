const router = require('express').Router();
const Note= require('../models/note.model');

router.get('/:id([0-9]{3,})', function(req, res){
   var currNote = movies.filter(function(note){
      if(note.id == req.params.id){
         return true;
      }
   });
   
   if(currNote.length == 1){
      res.json(currNote[0])
   } else {
      res.status(404);  //Set status to 404 as movie was not found
      res.json({message: "Not Found"});
   }
});
router.post('/', function(req, res){
   //Check if all fields are provided and are valid:
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

console.log(notes.length);
// STEP 2: Adding new data to users object 
notes.push(note); 
console.log(notes.length);
// STEP 3: Writing to a file 
fs.writeFile("./models/notes.json", JSON.stringify(notes), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log("Done writing"); // Success 
}); 
res.send(note);

});

router.put('/:id', function(req, res) {
   //Check if all fields are provided and are valid:
   if(!req.body.id||
      !req.body.topic ||
      !req.body.description) {
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      //Gets us the index of movie with given id.
      var updateIndex = notes.map(function(note){
         return note.id;
      }).indexOf(parseInt(req.params.noteId));
      
      if(updateIndex === -1){
         //Note not found, create new
         notes.push({
            id: req.params.noteId,
            topic: req.body.topic,
            description: req.body.description
         });
         res.json({
            message: "New note created.", location: "/notes/" + req.params.id});
      } else {
         //Update existing movie
         notes[updateIndex] = {
            id: req.params.noteId,
            topic: req.body.topic,
            description: req.body.description
         };
         res.json({message: "Note id " + req.params.noteId + " updated.",
            location: "/notes/" + req.params.noteId});
      }
   }
});

router.delete('/:id', function(req, res){
   var removeIndex = notes.map(function(note){
      return note.id;
   }).indexOf(req.params.id); //Gets us the index of movie with given id.
   
   if(removeIndex === -1){
      res.json({message: "Not found"});
   } else {
      movies.splice(removeIndex, 1);
      res.send({message: "Note id " + req.params.id + " removed."});
   }
});
module.exports = router;