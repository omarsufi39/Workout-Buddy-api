const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = async function (_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login user
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
    console.log(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Signup user
async function signupUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
};
