const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
 // 1. create httpServer instance that uses our Express-app (for socket.io)
const httpServer = require("http").createServer(app)
// 2. origin meaning those URL:s we allow to connect to us, during development it is http://localhost:3000
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});
// const io = require("socket.io")(1337)

io.on('connection', (socket) => {
    console.log("User connected with socket id:")
    console.log(socket.id); // Nått lång och slumpat
});

  

  
const port = process.env.PORT || 1337;
// import routes
const index = require("./routes/index");
const list = require("./routes/list");
const create = require("./routes/create");
const update = require("./routes/update");

// 3. listen for connections
// io.on('connection', function (socket) {
//     console.info("User connected");

//     // socket.on('chat message', function (message) {
//     //     io.emit('chat message', message);
// });

// 3. create Rooms, since many users must be able to edit in our editor.
// only exists on server side, but initiate from client side with 'emit' with:
// io.sockets.on('connection', function (socket) {
//     console.info("USER CONNECTED (SERVER MESSAGE)")
    // socket.on('current-input', function(room) { // listening for 'create' event on client side: socket.emit("create", docs["_id"]);
    //     socket.join(room); // creates a room connected to the specific socket, and the document we want to connect to
    // });
// });

// now we can use emit and to functions to send data to all clients in a specific room
// from client, where a change has occured, send both _id and new text as data, so we can use _id to send to right room
// socket.to(data["_id"]).emit("doc", data);

// Finally, an EventListener and a emit
// socket.on("doc", function (data) {
//     socket.to(data["_id"]).emit("doc", data);

//     // Spara till databas och göra annat med data
// });


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// hide log for tests
if (process.env.NODE_ENV !== "test") {
    // use morgan to log at command line
    app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs
}

// ROUTES
app.use("/", index);
app.use("/list", list);
app.use("/create", create);
app.use("/update", update);

// Error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Personalised error handler
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
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// export server for testing purposes
module.exports = server;