// process.env.NODE_ENV = 'test';

// const { expect } = require('chai');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../app.js');

// chai.should();
// chai.use(chaiHttp);

// // test database
// const databaseMethods = require("./db-prepare.js")
// // const collectionName = "docs"; // database name

// describe('testing src', () => {
//     before('prepare db', async function () {
//         await databaseMethods.tearDown(); // empty content in test db
//         await databaseMethods.setup(); // add collection 'docs-test' and one entry
//     });

//     describe('GET /list', () => {
//         it('should return 200', (done) => {
//             chai.request(server)
//                 .get("/list")
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);

//                     done();
//                 });
//         });
//     })
//     after('drop content', async function () {
//         await databaseMethods.tearDown(); // empty content in test db

//     })
// })