const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  tokenID: String,
  userName: String,
  userEmail: String,
  userPhone: String,
  expertId: String,
  expertName: String,
  expertEmail: String,
  rate: String,
  date: String,
  trxId: String,
  receipt_url: String,
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
