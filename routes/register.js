// Express
var express = require("express");
var router = express.Router();
const auth = require("../src/auth.js");

// Return a JSON object with list of all documents within the collection.
router.post("/", async function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password
    let result = await auth.register(email, password);

    const data = {
        data: result,
    };
    // terminal
    console.log(data);
    // browser json
    res.json(data);
    // status 200 (OK) returned
});

module.exports = router;

