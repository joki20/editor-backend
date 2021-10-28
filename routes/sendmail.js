// Express
var express = require("express");
var router = express.Router();
var send = require("../src/sendmail.js");

// Return a JSON object
router.post("/", async function (req, res, next) {
    let email = req.body.email;
    let currentUser = req.body.currentUser;
    let docId = req.body.docId;
    let title = req.body.title;
    let result = await send.mail(email, currentUser, docId, title);


    const data = {
        data: result,
    };
    // terminal
    console.log(data);
    // browser json
    res.json(data);
    // status 200 (OK) returned

})

module.exports = router;