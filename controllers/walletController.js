const Wallets = require("../models/walletSchema");

const walletController = {
  balanceCurrent: async (req, res) => {
    const id = req.params.id;
    
    try {
      
      const findBalance = await Wallets.findOne({ userId: id }).populate(
        "userId",
        "username"
      );
      if (!findBalance) {
        return res.json({ mess: "not found", status: true });
      }
      res.json({ data: findBalance });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = walletController;
