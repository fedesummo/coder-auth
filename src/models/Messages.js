const mongoose = require("../db/config");

const messagesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true
  }
});

const messagesModel = mongoose.model("messages", messagesSchema);

module.exports = messagesModel;
