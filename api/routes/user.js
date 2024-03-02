const router = require("express").Router();
const controller = require("../controllers/user");

router.post("/update/:id", controller.updateUser);
router.delete("/delete/:id", controller.deleteUser);

module.exports = router;
