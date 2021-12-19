let Validator = require("validatorjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

let userController = {
  index: async (req, res) => {
    try {
      const users = await User.find({});
      return apiResponse.success(res, { data: users }, 200, "All Users!");
    } catch (error) {
      res.json(error);
    }
  },

  getExpertByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const users = await User.find({ category });
      console.log("object all", users);
      return apiResponse.success(res, { data: users }, 200, "Users found");
    } catch (error) {
      res.json(error);
    }
  },

  checkEmail: async (req, res) => {
    try {
      let rules = {
        email: "required|email",
      };

      let { email } = req.body;

      let validation = new Validator(req.body, rules);

      if (validation.fails()) {
        return apiResponse.error(
          res,
          { error: validation.errors.all() },
          401,
          "Validation failed!"
        );
      }

      let user = await User.findOne({ email });

      if (user === null || user === undefined || user?.length == 0) {
        return apiResponse.success(
          res,
          null,
          200,
          "This email available for new registration."
        );
      }

      res.json({
        status: 404,
        success: false,
        message: "This email already registered!",
      });
    } catch (error) {
      return apiResponse.error(res, error);
    }
  },

  signup: async (req, res) => {
    try {
      let rules = {
        name: "required",
        email: "required|email",
        password: "required|min:6",
      };
      console.log("req.body", req.body);

      let validation = new Validator(req.body, rules);
      if (validation.fails()) {
        return apiResponse.error(
          res,
          { error: validation.errors.all() },
          401,
          "Validation failed!"
        );
      }

      let { name, email, password } = req.body;

      password = await bcrypt.hash(password, 10);

      console.log("password", password);
      const newUser = new User({
        name,
        email,
        password,
      });

      let user = await newUser.save();

      console.log("user", user);

      // jwt signing
      let token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      console.log("token", token);

      return apiResponse.success(
        res,
        {
          data: {
            name: user.name,
            email: user.email,
            token,
          },
        },
        201,
        "User registered successfully!"
      );
    } catch (error) {
      console.log("got here inside error" , error);
      return apiResponse.error(res, { error });
    }
  },

  login: async (req, res) => {
    try {
      let rules = {
        email: "required|email",
        password: "required|min:6",
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

      let { email, password } = req.body;

      let user = await User.findOne({ email });

      if (user === null || user === undefined || user?.length == 0) {
        return res.json({
          status: 404,
          success: false,
          message: "User not found with this specefic email.",
        });
      }

      let result = await bcrypt.compare(password, user.password);

      if (result) {
        let sign = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );

        return apiResponse.success(
          res,
          {
            data: {
              name: user.name,
              email: user.email,
              token: sign,
            },
          },
          200,
          "Login successful"
        );
      } else {
        res.json({
          status: 404,
          success: false,
          message: "Email or password does not match!",
        });
      }
    } catch (error) {
      return apiResponse.error(res, error);
    }
  },

  verifyToken: async (req, res) => {
    try {
      let { accessToken } = req.body;

      console.log("accessToken", accessToken);

      if (!accessToken || accessToken === null || accessToken === undefined) {
        return apiResponse.error(res, null, 404, "No token found!");
      }

      jwt.verify(
        accessToken,
        process.env.JWT_SECRET,
        async function (err, decoded) {
          if (err) {
            return apiResponse.error(res, { err }, 401, "Expired token");
          }
          let id = decoded?.id;
          let user = await User.findOne({ _id: id });

          console.log("user", user);

          if (user === null || user === undefined || user?.length == 0) {
            return apiResponse.error(
              res,
              null,
              404,
              "User not found with this specefic id."
            );
          }

          return apiResponse.success(
            res,
            {
              data: {
                userImage: user.userImage,
                name: user.name,
                email: user.email,
                about: user.about,
                category: user.category,
                rate: user.rate,
              },
            },
            200,
            "Valid token"
          );
        }
      );
    } catch (error) {
      return apiResponse.error(res, error, 404, "Invalid token");
    }
  },
};

module.exports = userController;
