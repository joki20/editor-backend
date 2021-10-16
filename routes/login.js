// Express
var express = require("express");
var router = express.Router();
const auth = require("../src/auth.js");


// Return a JSON object with list of all documents within the collection.
router.post("/", async function (req, res, next) {
    // get posted email and password
    let email = req.body.email;
    let password = req.body.password
    // create token after login
    let token = await auth.login(email, password);

    // If login was successful, token is not undefined
    const data = {
        data: token,
    };
    // terminal
    console.log(data);
    // browser json
    res.json(data);
    // status 200 (OK) returned
});

module.exports = router;

