require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");

const fileUpload = require("express-fileupload");
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(cookie());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const listingRoute = require("./routes/listing");

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/listing", listingRoute);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  return res.status(err.status).json({
    success: false,
    message: err.message,
  });
});

app.listen(process.env.PORT, console.log("Server is running at port 3000"));
