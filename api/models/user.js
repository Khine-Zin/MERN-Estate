const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passward: { type: String, required: true },
    picture: {
      type: String,
      default:
        "https://www.libarts.colostate.edu/wp-content/mu-plugins/cla-people/templates/userphoto.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
