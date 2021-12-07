const authRoutes = require("express").Router();
const expertController = require("../controllers/v1/expertController");

authRoutes.route("/signup").post(expertController.signup);

authRoutes.route("/experts").get(expertController.index);

authRoutes
  .route("/experts/:category")
  .get(expertController.getExpertByCategory);

authRoutes.route("/login").post(expertController.login);

authRoutes.route("/email").post(expertController.checkEmail);

authRoutes.route("/verify-token").post(expertController.verifyToken);

module.exports = authRoutes;
