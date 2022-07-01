const MongoDBContainer = require("../containers/mongo");
const messagesModel = require("../models/Messages");

class MongoDBMsgs extends MongoDBContainer {
  constructor() {
    super(messagesModel);
  }
}

const msgsDao = new MongoDBMsgs();

module.exports = msgsDao;
