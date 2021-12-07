const appointment = require("express").Router();
const appointmentController = require("../controllers/v1/appointmentController");

appointment.route("/add").post(appointmentController.addAppointment);

appointment
  .route("/booked-appointments/:expertEmail")
  .get(appointmentController.getAppointmentsByemail);

appointment
  .route("/booked-appointments/date")
  .post(appointmentController.getAppointmentsByDate);

module.exports = appointment;
