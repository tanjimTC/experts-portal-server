const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const physicalAppointmentSchema = new Schema({
  approved: Boolean,
  userName: String,
  userEmail: String,
  userPhone: String,
  expertId: String,
  expertName: String,
  expertEmail: String,
  rate: String,
  date: String,
});

const PhysicalAppointment = mongoose.model(
  "physicalAppointment",
  physicalAppointmentSchema
);
module.exports = PhysicalAppointment;
