const User = require("../models/user");
const Helper = require("../utils/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, passward } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return Helper.fMsg(res, false, "Your Email Already Use");
  }

  const hashedPassward = bcrypt.hashSync(passward, 10);
  const newUser = new User({
    username,
    email,
    passward: hashedPassward,
  });
  try {
    await newUser.save();
    Helper.fMsg(res, true, "User Created Successfully", newUser);
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, passward } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return Helper.fMsg(res, false, "User not found");
    }
    const validPassward = bcrypt.compareSync(passward, validUser.passward);
    if (!validPassward) {
      return Helper.fMsg(res, false, "Invalid passward");
    }
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    res.cookie("access_token", token, { httpOnly: true });
    const { passward: pass, ...rest } = validUser._doc;
    Helper.fMsg(res, true, "Login Success", rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { passward: pass, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true });
      Helper.fMsg(res, true, "Login Success", rest);
    } else {
      const generatePassward =
        Math.random()
          .toString(36)
          .slice(-8) +
        Math.random()
          .toString(36)
          .slice(-8);
      const hashedPassward = bcrypt.hashSync(generatePassward, 10);
      const newUser = new User({
        username:
          req.body.username
            .split(" ")
            .join("")
            .toLowerCase() +
          Math.random()
            .toString(36)
            .slice(-8),
        email: req.body.email,
        passward: hashedPassward,
        picture: req.body.picture,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { passward: pass, ...rest } = newUser._doc;
      res.cookie("access_token", token, { httpOnly: true });
      Helper.fMsg(res, true, "Login Success", rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  google,
};
