const router = require("express").Router();
const controller = require("../controllers/auth");
const { RegisterSchema } = require("../utils/schema");
const { validateBody } = require("../utils/validator");

router.post("/signup" ,controller.signup);
router.post("/signin" , controller.signin);
router.post("/google", controller.google);
router.get("/signout", controller.signout);

module.exports = router;
