const { engine } = require("express-handlebars");
const socketHandler = require("./src/socket");
const router = require("./src/routes/index");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
require("dotenv").config();

const app = express();

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", router);
app.use(express.static("./public"));

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.set("view engine", "hbs");
app.set("views", "./public/views");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: "./public/views/layouts",
    partialsDir: "./public/views/partials",
    defaultLayout: "index",
  })
);

const io = new Server(server);

io.on("connection", socketHandler);
