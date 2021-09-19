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

const create = require("../src/post.js")
 
  
  // Write tests below
 
// CHECK NEW ENTRY WAS MADE
describe('POST Request', () => {
    // Check function for creating new entry
    before('prepare db', async function () {
        await databaseMethods.tearDown(); // empty content in test db

        // add collection 'docstest' and one entry. Result contains array with json objects
        let body1 = {
            title: "newTitle1",
            content: "newContent1"
        }
        await create.oneDocument(body1);

        let body2 = {
            title: "newTitle2",
            content: "newContent2"
        }
        await create.oneDocument(body2);

        done();
        
    });


    // Check new entry
    describe('GET /list', () => {
        before('get all entries', async function () {
            // get all entries
            result = await databaseMethods.get();
        });

        describe('GET / list', () => {
            it('should return a collection with one entry', (done) => {
                chai.request(server)
                    .get("/list")
                    .end((err, res) => {
                        expect(res.body.data).to.have.lengthOf(2); // one entry
                        expect(res.body.data[0].title).to.equal("newTitle1")
                        expect(res.body.data[0].content).to.equal("newContent1")
                        expect(res.body.data[1].title).to.equal("newTitle2")
                        expect(res.body.data[1].content).to.equal("newContent2")
                            
                        done();
                    });
            });
        })
    });
})