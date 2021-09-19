// Express
var express = require("express");
var router = express.Router();
const put = require("../src/put.js");

// Return a JSON object with list of all documents within the collection.
router.post("/:id", async function (req, res, next) {
    await put.updateDocument(req.params.id, req.body); // containing posted params
    
    res.status(204).json({
        data: {
            msg: "Got a POST request, sending back 204 Updated",
        },
    });
});

module.exports = router;