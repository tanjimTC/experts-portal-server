let Validator = require("validatorjs");
const Appointment = require("../../models/Appointment");
const PhysicalAppointment = require("../../models/PhysicalAppointment");

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

  getAppointmentsByClientEmail: async (req, res) => {
    try {
      const { userEmail } = req.params;
      console.log("userEmail", userEmail);
      const Appointments = await Appointment.find({ userEmail });
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

  getRequstedAppointmentsByemail: async (req, res) => {
    try {
      const { expertEmail } = req.params;
      console.log("expertEmail", expertEmail);
      const Appointments = await PhysicalAppointment.find({ expertEmail });
      console.log("Appointments", Appointments);
      return apiResponse.success(
        res,
        { data: Appointments },
        200,
        "Requested Appointments by Email found"
      );
    } catch (error) {
      res.json(error);
    }
  },


  getRequstedAppointmentsByClientemail: async (req, res) => {
    try {
      const { userEmail } = req.params;
      console.log("userEmail", userEmail);
      const Appointments = await PhysicalAppointment.find({ userEmail });
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

  getAppointmentsByDateClient: async (req, res) => {
    try {
      const { date, email } = req.body;
      const Appointments = await Appointment.find({ date, userEmail: email });
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

  getPhysicalAppointmentsByDate: async (req, res) => {
    try {
      const { date, email } = req.body;
      console.log("date", date);
      const Appointments = await PhysicalAppointment.find({ date, expertEmail: email });
      return apiResponse.success(
        res,
        { data: Appointments },
        200,
        "Physical Appointments by date found"
      );
    } catch (error) {
      res.json(error);
    }
  },

  getPhysicalAppointmentsByClientDate: async (req, res) => {
    try {
      const { date, email } = req.body;
      console.log("date", date);
      const Appointments = await PhysicalAppointment.find({ date, userEmail: email });
      return apiResponse.success(
        res,
        { data: Appointments },
        200,
        "Physical Appointments by date found"
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

  reqAppointment: async (req, res) => {
    try {
      let rules = {
        userName: "string",
        userEmail: "string",
        userPhone: "string",
        expertId: "string",
        expertName: "string",
        expertEmail: "string",
        rate: "string",
        date: "string",
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
        userName,
        userEmail,
        userPhone,
        expertName,
        expertId,
        expertEmail,
        rate,
        date,
      } = req.body;

      const newAppointment = new PhysicalAppointment({
        userName,
        userEmail,
        userPhone,
        expertId,
        expertName,
        expertEmail,
        rate,
        date,
        status: false,
      });

      let appointment = await newAppointment.save();

      return apiResponse.success(
        res,
        {
          data: appointment,
        },
        201,
        "Appointment requsted successfully!"
      );
    } catch (error) {
      console.log("got here inside error");
      return apiResponse.error(res, { error });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      let { id, status } = req.body;

      if (status) {
        const appointment = await PhysicalAppointment.findOneAndUpdate(
          { _id: id },
          { status: status },
          { new: true }
        );

        console.log("appointment", appointment);
        return apiResponse.success(
          res,
          {
            data: appointment,
          },
          201,
          "Appointment updated successfully!"
        );
      } else {
        const appointment = await PhysicalAppointment.findByIdAndDelete(id);
        return apiResponse.success(
          res,
          {
            data: appointment,
          },
          201,
          "Appointment updated successfully!"
        );
      }
    } catch (error) {
      console.log("got here inside error");
      return apiResponse.error(res, { error });
    }
  },
};

module.exports = appointmentController;
