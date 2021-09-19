/**
 * Testing route responses
 */

process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();
chai.use(chaiHttp);
 
const databaseMethods = require("./db-prepare.js")
 
 // Write tests below

 // CHECK ROUTES AND TYPE OF RESPONSE
describe('GET Request', () => {
    // PREPARE DB AND CREATE ONE ENTRY
    before('prepare db', async function () {
        await databaseMethods.tearDown(); // empty content in test db
        // add collection 'docstest' and one entry. Result contains array with json objects
        result = await databaseMethods.create();
    });

    // GET RESPONSE
    describe('GET /list', () => {
        it('should return status 200 and one object', (done) => {
            chai.request(server)
                .get("/list")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.data).to.be.an("array");
                    expect(res.body.data).to.have.lengthOf(1); // one entry
                    expect(res.body.data[0].title).to.equal("Test Title")
                    expect(res.body.data[0].content).to.equal("Test Content")

                    done();
                });
        });
    });

    // CREATE RESPONSE
    describe('POST /create', () => {
        it('should return status 201 (successful post)', (done) => {
            chai.request(server)
                .post("/create/")
                .end((err, res) => {
                    expect(res).to.have.status(201);
    
                    done();
                });
        });
    })
    
    // UPDATE RESPONSE
    describe('PUT /update/id', () => {
        it('should return status 204 (successful update)', (done) => {
            let id = result[0]._id;

            chai.request(server)
                .post(`/update/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);

                    done();
                });
        });
    });
})