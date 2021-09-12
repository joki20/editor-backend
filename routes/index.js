var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    const data = {
        data: "Welcome to my backend page",
    };
    // terminal
    console.log(data);
    // browser json
    res.json(data);
    // status
    res.status(200).send();
});

module.exports = router;
