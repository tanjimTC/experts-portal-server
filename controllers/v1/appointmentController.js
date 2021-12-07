let Validator = require("validatorjs");
const Appointment = require("../../models/Appointment");

let appointmentController = {
  getAppointmentsByemail: async (req, res) => {
    try {
      const { expertEmail } = req.params;
      console.log("expertEmail", expertEmail);
      const Appointments = await Appointment.find({ expertEmail });
      console.log("Appointments", Appointments);
      return apiResponse.success(
        res,
        { data: Appointments },
        200,
        "Appointments by Email found"
      );
    } catch (error) {
      res.json(error);
    }
  },

  getAppointmentsByDate: async (req, res) => {
    try {
      const { date, email } = req.body;
      console.log("date", date);
      const Appointments = await Appointment.find({ date, expertEmail: email });
      return apiResponse.success(
        res,
        { data: Appointments },
        200,
        "Appointments by date found"
      );
    } catch (error) {
      res.json(error);
    }
  },

  addAppointment: async (req, res) => {
    try {
      let rules = {
        tokenID: "string",
        userName: "string",
        userEmail: "string",
        userPhone: "string",
        expertId: "string",
        expertName: "string",
        expertEmail: "string",
        rate: "string",
        date: "string",
        trxId: "string",
        receipt_url: "string",
      };

      let validation = new Validator(req.body, rules);
      if (validation.fails()) {
        return apiResponse.error(
          res,
          { error: validation.errors.all() },
          401,
          "Validation failed!"
        );
      }

      let {
        tokenID,
        userName,
        userEmail,
        userPhone,
        expertName,
        expertId,
        expertEmail,
        rate,
        date,
        trxId,
        receipt_url,
      } = req.body;

      const newAppointment = new Appointment({
        tokenID,
        userName,
        userEmail,
        userPhone,
        expertId,
        expertName,
        expertEmail,
        rate,
        date,
        trxId,
        receipt_url,
      });

      let appointment = await newAppointment.save();

      return apiResponse.success(
        res,
        {
          data: appointment,
        },
        201,
        "Appointment added successfully!"
      );
    } catch (error) {
      console.log("got here inside error");
      return apiResponse.error(res, { error });
    }
  },
};

module.exports = appointmentController;
