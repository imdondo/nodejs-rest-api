const express = require('express');
const bodyParser = require('body-parser');
const Note = require('./models/note.model');
var fs = require("fs");
var cors = require('cors');
const notes = require("./models/notes.json"); 
// create express app
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// require('./app/routes/note.routes.js')(app);
require('./routes/note.routes.js')(app);

// listen for requests

module.exports = app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// module.exports = server;
