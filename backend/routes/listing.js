const router = require("express").Router();
const controller = require("../controllers/listing");
const { saveFiles } = require("../utils/gallery");

router.post("/create",saveFiles, controller.createListing);
router.delete("/delete/:id", controller.deleteListing);
router.post("/update/:id",saveFiles, controller.updateListing);
router.get("/getListing/:id", controller.getListing);
router.get("/getListing", controller.getListings);


module.exports = router;