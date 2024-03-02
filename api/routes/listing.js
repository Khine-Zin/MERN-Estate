const router = require("express").Router();
const controller = require("../controllers/listing");

router.post("/create", controller.createListing);


module.exports = router;