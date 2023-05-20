var express = require("express");
var router = express.Router();
const bookingController = require("../controllers/bookingController");
const { checkRole } = require("../middleware/authorization");
const verifyToken = require("../middleware/auth");
//localhost:3000//booking/add/16814173123132
router.post("/add/:id", verifyToken, bookingController.add);
router.put("/handel/:id", verifyToken, bookingController.handleBookingAccept);
router.get("/listbooking/:id", verifyToken, bookingController.getIdBooking);
//router.delete('/delete', bookingController.deleteAll);
router.delete(
  "/delete/:id",
  verifyToken,
  checkRole("admin"),
  bookingController.delete
);

module.exports = router;
