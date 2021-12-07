const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expertSchema = new Schema({
  userImage: Object,
  name: String,
  email: String,
  about: String,
  category: String,
  rate: String,
  password: String,
});

const Expert = mongoose.model("expert", expertSchema);
module.exports = Expert;
