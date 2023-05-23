const Info = require("../models/infoSchema");
const Booking = require("../models/bookingSchema");
const Experiences = require("../models/experienceSchema");
const User = require("../models/userSchame");
const Wallet = require("../models/walletSchema");
const intermediarySchema = require("../models/intermediarySchema");
const experienceController = require("../controllers/experienceController");

const bookingController = {
  add: async (req, res) => {
    const id = req.params.id;
    const { startDate, endDate, day, address } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Find existing bookings for the same ny_id that overlap with the requested dates
    const existingBookings = await Booking.find({
      ny_id: id,
      startDate: { $lte: endDate }, // end date of existing booking is after or same as the requested start date
      endDate: { $gte: startDate }, // start date of existing booking is before or same as the requested end date
      day: day, // existing booking is for the same day as requested
      status: ["INACCEPT", "ACCEPT"],
    });

    if (existingBookings.length > 0) {
      return res.json({
        mess: "You cannot book at this time on this day",
        status: false,
      });
    }
    //tinh gio
    const hour = (end - start) / 3600000; // Lấy số giờ giữa hai thời điểm

    const coin = await Wallet.findOne({ userId: req.userId });
    if (!coin) {
      return res.json({ mess: "not found wallet" });
    }
    const balance = coin.coin;
    const ny = await Info.findById(id).populate("user", "_id");
    const totalTimeRent =Math.round( ny.rent_cost * hour);
    if (balance < totalTimeRent) {
      return res
        .status(401)
        .json({ mess: "ban khong du tien ma doi hop tac?" });
    }

    try {
      const saveBooking = new Booking({
        user_id: req.userId,
        ny_id: id,
        amount: 1,
        startDate,
        endDate,
        address,
        day,
        price: totalTimeRent,
      });
      const result = await saveBooking.save();
      console.log(saveBooking);

      const newbalance = balance - totalTimeRent;
      await Wallet.updateOne({ userId: req.userId }, { coin: newbalance });

      const token = "hfcffytf577aadqdqdqwa7";
      const expireAt = new Date(Date.now() + 5 * 60 * 1000);
      const intermediarysSave = new intermediarySchema({
        coin: totalTimeRent,
        token,
        expireAt,
        userId: req.userId,
        parterId: id,
      });

      await intermediarysSave.save();

      await Booking.updateOne(
        { _id: saveBooking._id },
        { intermediaryToken: intermediarysSave._id }
      );

      // Set a timeout to refund the user's money when the intermediary token expires
      setTimeout(async () => {
        // Find the intermediary token created earlier
        const expiredToken = await intermediarySchema.findOne({
          _id: intermediarysSave._id,
        });

        // If the token hasn't been used and hasn't expired yet, refund the user's money
        if (
          expiredToken &&
          !expiredToken.isUsed &&
          expiredToken.expireAt > new Date()
        ) {
          const userWallet = await Wallet.findOne({ userId: req.userId });
          const userBalance = userWallet.coin + expiredToken.coin;
          await Wallet.updateOne({ userId: req.userId }, { coin: userBalance });
          await intermediarySchema.deleteOne({ _id: expiredToken._id });
          res.status(401).json({ mess: "parter not accept your request" });
        }
      }, 5 * 60 * 1000); // 5 minutes

      const experience = await Experiences.findOne({ ny_id: id });

      if (experience) {
        const update = experience.accumulated + 1;
        await experience.updateOne({ accumulated: update });
        // res.json({mess:'successfully!',data:experience});
      }

      const Happy = experienceController.getId(req, res, id);

      res.json({ mess: "successfully!!!", data: result, upLevel:Happy });
    } catch (err) {
      return res.json(err);
    }
  },
  handleBookingAccept: async (req, res) => {
    const idBooking = req.params.id;
    const { status } = req.body;

    try {
      // Lấy thông tin booking từ database
      const booking = await Booking.findById(idBooking)
        .populate("user_id", "_id")
        .populate("ny_id", "_id rent_cost");

      // Kiểm tra xem booking có tồn tại và có ở trạng thái INACCEPT hay không
      if (!booking || booking.status !== "INACCEPT") {
        return res
          .status(404)
          .json({ message: "Booking not found or not in INACCEPT state" });
      }
      if (status === "ACCEPT") {
        // Cập nhật trạng thái booking thành ACCEPT
        await booking.updateOne({ status: "ACCEPT" });

        // Thêm số tiền vào ví của parter
        const idParter = await Wallet.findOne({ userId: booking.ny_id._id });

        const idIntermediary = booking.intermediaryToken;
        const findIdIntermediary = await intermediarySchema.findOne({
          _id: idIntermediary,
        });
        const newBalance = idParter.coin + findIdIntermediary.coin;

        await Wallet.updateOne({ _id: idParter }, { coin: newBalance });
        await Booking.updateOne(
          { _id: idBooking },
          { intermediaryToken: null }
        );
        await intermediarySchema.deleteOne({ _id: findIdIntermediary });
        res.json({ message: "Accept successfully" });
      }
      if (status === "CANCEL") {
        // Cập nhật trạng thái booking thành CANCEL
        await booking.updateOne({ status: "CANCEL" });
        const idUser = await Wallet.findOne({ userId: booking.user_id._id });

        const idIntermediary = booking.intermediaryToken;
        const findIdIntermediary = await intermediarySchema.findOne({
          _id: idIntermediary,
        });
        const newBalance = idUser.coin + findIdIntermediary.coin;
        const balanceParter = await Wallet.updateOne(
          { _id: idUser },
          { coin: newBalance }
        );
        await Booking.updateOne(
          { _id: idBooking },
          { intermediaryToken: null }
        );
        await intermediarySchema.deleteOne({ _id: findIdIntermediary });
        res.status(200).json({ mess: "cancel successfully!!" });
      }
      if (status === "FINISH") {
        await booking.updateOne({ status: "FINISH" });
        res.json({ mess: "very good confugiration!!" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getIdBooking: async (req, res) => {
    const id = req.params.id;
    try {
      const listBookingParter = await Booking.find({ ny_id: id });

      return res.json({ data: listBookingParter });
    } catch (err) {
      console.log(err);
    }
  },
  // deleteAll: async (req, res) => {
  //   try {
  //     await Booking.deleteMany();

  //     res.json('Đã xóa hết dữ liệu trong bảng "booking"');
  //   } catch (error) {
  //     return res.json(errpr);
  //   }
  // },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      await Booking.findByIdAndDelete(id);
      res.json("delete successfully");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = bookingController;
