const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const router = require("./src/routes/index");
const { engine } = require("express-handlebars");
const socketHandler = require("./src/socket");

const app = express();

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
    defaultLayout: "index",
    partialsDir: "./public/views/partials",
  })
);

const io = new Server(server);

io.on("connection", socketHandler);

// io.on("connection", async (socket) => {

//   // Get all messages.
//   try {
//     console.log("new user")
//     // const data = await knex.from("messages").select("*");
//     // socket.emit("messages_list", data);
//   } catch (err) {
//     console.log(err);
//   }

//   // Post new message.
//   socket.on("post_message", async (data) => {
//     try {
//         console.log(data)
//     //   await knex("messages").insert(data);
//     //   const res = await knex.from("messages").select("*");
//     //   socket.emit("messages_list", res);
//     } catch (err) {
//       console.log(err);
//     }
//   });

// });