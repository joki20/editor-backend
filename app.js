const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 1337;

// SERVER AND SOCKET
const app = express();
const httpServer = require("http").createServer(app);

// ROUTES
const index = require("./routes/index");
const users = require("./routes/users");
const create = require("./routes/create");
const update = require("./routes/update");
const sendmail = require("./routes/sendmail");

// AUTH
const register = require("./routes/register");
const login = require("./routes/login");
const allow_user = require("./routes/allow_user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // hash password

// GRAPHQL
const { graphqlHTTP } = require('express-graphql');
// graphql schema provider
const { GraphQLSchema } = require("graphql");
// root query object
const RootQueryType = require("./graphql/root.js");
// graphiql: set true if localhost, false if production
const visual = false;

// vid deployment för kmom05: ändra * db / database.js FRÅN docs - test till docs

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// socket receives connections from port 3000 or student.bth.se
// (local server is occupied by port 1337)
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "https://www.student.bth.se",
      methods: ["GET", "POST"]
    }
  });

// on connection
io.sockets.on('connection', function (socket) {
    // console.log("id: " + socket.id); // random socket id

    // create event received from frontend, where room is the same as doc object from frontend
    socket.on('create', function (room) {
        // console.log(room)
        // creates room connected to this specific socket id and document
        socket.join(room._id);
        
        // room.html will be used in client only, to update content of all sockets
        socket.to(room._id).emit("doc", room);
    });
});


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

// CREATE SCHEMA, QUERY RootQuery object inside graphql/root.js
const schema = new GraphQLSchema({
    query: RootQueryType
});

// ROUTES
app.use("/", index);
app.use("/users", users);
app.use("/create", create);
app.use("/update", update);
app.use("/register", register);
app.use("/login", login);
app.use("/allow_user", allow_user);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    // true if localhost, false otherwise (when production needs to be false)
    graphiql: visual,
}));
app.use("/sendmail", sendmail);

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
// Start up server using created httpServer för socket.io
const server = httpServer.listen(port, () => console.log(`Listening on port ${port}!`));
// export server for testing purposes
module.exports = server;