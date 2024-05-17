const authRoutes = require("express").Router();
const expertController = require("../controllers/v1/expertController");
const userController = require("../controllers/v1/userController");

authRoutes.route("/signup").post(expertController.signup);
authRoutes.route("/user/signup").post(userController.signup);

authRoutes.route("/login").post(expertController.login);
authRoutes.route("/user/login").post(userController.login);

authRoutes.route("/email").post(expertController.checkEmail);
authRoutes.route("/user/email").post(userController.checkEmail);

authRoutes.route("/experts").get(expertController.index);
authRoutes.route("/verify-token").post(expertController.verifyToken);

authRoutes
  .route("/experts/:category")
  .get(expertController.getExpertByCategory);

module.exports = authRoutes;
