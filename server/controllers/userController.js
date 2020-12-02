const User = require("../models").User;
const generateToken = require("../utils/generateToken");

module.exports = {
  createNewUser: async function (req, res) {
    try {
      const { name, email, password } = req.body;

      // Check that name, email, and password are not empty or null
      if (
        name === "" ||
        name === null ||
        email === "" ||
        email === null ||
        password === "" ||
        password === null
      ) {
        // If fields are empty return 400 status
        res.status(400).json({ message: "Please fill out all fields." });
      } else {
        // Check if user email already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
          // If user's email is already registered send 400 status
          res
            .status(400)
            .json({ message: "A user with that email already exists." });
        } else {
          // Create new user if email isn't yet registered
          const user = await User.create({
            name,
            email,
            password,
          });

          // Once user is created send 201 status and generate token for user
          if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id),
            });
          } else {
            res.status(400).json({ message: "Invalid user data." });
          }
        }
      }
    } catch (error) {
      res.status(422).json(error);
    }
  },
  getAllUsers: async function (req, res) {
    try {
      const users = await User.find({}).select("-password");
      res.json(users);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  authenticateUser: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

      // If user exists and password is correct
      if (user && (await user.matchPassword(password))) {
        // Return authenticated user
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        // If user login fails return 401 status
        res.status(401).json({ message: "Invalid login credentials." });
      }
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
