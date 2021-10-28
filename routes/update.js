// Express
var express = require("express");
var router = express.Router();
const put = require("../src/put.js");

// Return a JSON object with list of all documents within the collection.
router.post("/", async function (req, res, next) {
    console.log(req);
    console.log("INSIDE UPDATE ROUTE")
    let docOwner = req.body.docOwner;
    let docId = req.body.docId;
    let content = req.body.content;
    let type = req.body.type;

    console.log(docOwner);
    console.log(docId);
    console.log(content);

    await put.updateDocument(docOwner, docId, content, type);
    
    res.status(204).json({
        data: {
            msg: "Got a POST request, sending back 204 Updated",
        },
    });
});

module.exports = router;