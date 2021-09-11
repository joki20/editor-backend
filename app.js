const bodyParser = require("body-parser"); // use POST, PUT and DELETE
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const app = express();
// process is global variable containing environmental variable PORT
// if process.env.PORT is set, then assign, otherwise assign 1337
const port = process.env.PORT || 1337;

// parse body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const index = require("./routes/index");
const hello = require("./routes/hello");

// allows different clients from other domains to access our API
app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
    // use morgan to log at command line
    app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs
}

// This is middleware which is called for ALL routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// ROUTES
app.use("/", index);
app.use("/hello", hello);

app.post("/user", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created",
        },
    });
});

app.put("/user", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err); // send to our own error handler below
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        errors: [
            {
                status: err.status,
                title: err.message,
                detail: err.message,
            },
        ],
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
