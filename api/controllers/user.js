const User = require("../models/user");
const Helper = require("../utils/helper");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res, next) => {
  const currentUser = await User.findById(req.params.id);
  if (!currentUser) {
    return Helper.fMsg(res, false, "User not found");
  }

  try {
    if (req.body.passward) {
      req.body.passward = bcrypt.hashSync(req.body.passward);
    }

    const picture = `http://localhost:3000/uploads/${req.files.file.name}`;
    const updateUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          passward: req.body.passward,
          picture,
        },
      },
      { new: true }
    );
    const { passward: pass, ...rest } = updateUser._doc;
    Helper.fMsg(res, true, "Login Success", rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
};
