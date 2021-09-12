// Express
var express = require("express");
var router = express.Router();
const app = express();

const data = require("../src/put.js");

// Return a JSON object with list of all documents within the collection.
router.post("/:title/:content", async function (req, res, next) {
    let content = await data.updateDocument(
        req.params.title,
        req.params.content
    );

    res.status(204).json({
        data: {
            msg: "Got a POST request, sending back 201 Created",
        },
    });
});

module.exports = router;
