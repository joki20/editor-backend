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

const create = require("../src/post.js");
const put = require("../src/put.js");

let result;
let id;
  
  // Write tests below
 
// CHECK NEW ENTRY WAS MADE
describe('PUT Request', () => {
    // Check function for creating new entry
    before('prepare db', async function () {
        await databaseMethods.tearDown(); // empty content in test db

        // add collection 'docstest' and one entry. Result contains array with json objects
        let body1 = {
            title: "newTitle1",
            content: "newContent1"
        }
        await create.oneDocument(body1);
    });


    // Update entry
    describe('GET /list', () => {
        before('get all entries', async function () {
            // get all entries
            result = await databaseMethods.get();
            id = result[0]._id;
        });

        describe('UPDATE / list', () => {
            before("update title and content", async function () {
                // update
                let updatedBody = {
                    title: "updatedTitle",
                    content: "updatedContent"
                }
                await put.updateDocument(id, updatedBody)
                
            });

            describe("GET /list again", () => {
                it('should get all entries and see if title updated', (done) => {
                    chai.request(server)
                        .get("/list")
                        .end((err, res) => {
                            expect(res.body.data[0].title).to.equal("updatedTitle");
                            expect(res.body.data[0].content).to.equal("updatedContent");
                            
                            done();
                        });
                });
            });
        });
    })
})