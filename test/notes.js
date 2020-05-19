let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Notes API', () => {

    /**
     * Test the GET route
     */
    describe("GET /api/notes", () => {
        it("It should GET all the notes", (done) => {
            chai.request(server)
                .get("/api/notes")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(10);
                done();
                });
        });

        it("It should NOT GET all the notes", (done) => {
            chai.request(server)
                .get("/api/notes")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /api/notes/:id", () => {
        it("It should GET a notes by ID", (done) => {
            const noteId = 1;
            chai.request(server)                
                .get("/api/notes/" + noteId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('topic');
                    response.body.should.have.property('description');
                    response.body.should.have.property('id').eq(1);
                done();
                });
        });

        it("It should NOT GET a note by ID", (done) => {
            const noteId = 123;
            chai.request(server)                
                .get("/api/tasks/" + noteId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                });
        });

    });
    

    /**
     * Test the POST route
     */
    describe("POST /api/notes", () => {
        it("It should POST a new task", (done) => {
            const note = {
                topic: "Topic 4",
                description: "New Description"
                
            };
            chai.request(server)                
                .post("/api/notes")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('topic').eq("Topic 4");
                    response.body.should.have.property('description').eq("New Description");
                done();
                });
        });

        it("It should NOT POST a new task without the name property", (done) => {
            const note = {
                topic: "Another Desc"
            };
            chai.request(server)                
                .post("/api/notes")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The description is required!");
                done();
                });
        });

    });


    /**
     * Test the PUT route
     */
    describe("PUT /api/notes/:id", () => {
        it("It should PUT an existing note", (done) => {
            const noteId = 1;
            const task = {
                topic: "Topic 1 changed",
                description: "New Desc"
            };
            chai.request(server)                
                .put("/api/note/" + noteId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('topic').eq("Task 1 changed");
                    response.body.should.have.property('description').eq("New Desc");
                done();
                });
        });

        it("It should NOT PUT an existing task with a name with less than 3 characters", (done) => {
            const noteId = 1;
            const note = {
                topic: "Topic",
                description: "Disaster"
            };
            chai.request(server)                
                .put("/api/notes/" + noteId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

});