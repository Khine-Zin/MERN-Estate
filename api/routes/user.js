const router = require("express").Router();
const controller = require("../controllers/user");
const { saveFile } = require("../utils/gallery");

router.post("/update/:id", saveFile, controller.updateUser);

module.exports = router;
