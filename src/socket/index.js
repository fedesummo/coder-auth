const { faker } = require("@faker-js/faker");
const msgsDao = require("./../daos/messages");
const msgsDaos = require("./../daos/messages")

const socketHandler = async (socket) => {

  // Get all messages.
  try {
    const docs = await msgsDao.getAllDocuments()
    socket.emit("messages_list", docs);
  } catch (err) {
    console.log(err);
  }

  // Post new message.
  socket.on("post_message", async (data) => {
    try {
      const { text } = data
      const doc = {
        author: {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.random.numeric(2),
            avatar: faker.internet.avatar(),
        },
        text
    }
    await msgsDaos.saveDocument(doc)
    } catch (err) {
      console.log(err);
    }
  });
  
};

module.exports = socketHandler;
