const router = require("express").Router();
const controller = require("../controllers/user");
const { saveFile } = require("../utils/gallery");

router.post("/update/:id",saveFile, controller.updateUser);
router.delete("/delete/:id", controller.deleteUser);
router.get("/listing/:id", controller.getUserListing);
router.get("/:id", controller.getUser)

module.exports = router;
