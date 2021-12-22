const appointment = require("express").Router();
const appointmentController = require("../controllers/v1/appointmentController");

appointment.route("/add").post(appointmentController.addAppointment);
appointment.route("/req").post(appointmentController.reqAppointment);
appointment.route("/update").post(appointmentController.updateAppointment);

appointment
  .route("/booked-appointments/:expertEmail")
  .get(appointmentController.getAppointmentsByemail);

appointment
  .route("/requested-appointments/:expertEmail")
  .get(appointmentController.getRequstedAppointmentsByemail);

appointment
  .route("/requested-appointments/client/:userEmail")
  .get(appointmentController.getRequstedAppointmentsByClientemail);

appointment
  .route("/booked-appointments/client/:userEmail")
  .get(appointmentController.getAppointmentsByClientEmail);

appointment
  .route("/booked-appointments/date")
  .post(appointmentController.getAppointmentsByDate);
appointment
  .route("/booked-appointments/client/date")
  .post(appointmentController.getAppointmentsByDateClient);

appointment
  .route("/booked-appointments/physical/date")
  .post(appointmentController.getPhysicalAppointmentsByDate);

appointment
  .route("/booked-appointments/physical/client/date")
  .post(appointmentController.getPhysicalAppointmentsByClientDate);

module.exports = appointment;
