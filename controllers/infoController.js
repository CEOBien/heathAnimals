const Info = require("../models/infoSchema");
const User = require("../models/userSchame");
const Experiences = require("../models/experienceSchema");
const Rank = require("../models/rankSchema");
const cloudinary = require("cloudinary").v2;

const infoController = {
  addPets: async (req, res) => {
    const { name, gender, old, height, weight, skill, phone, address } =
      req.body;

    try {
      const fileData = req.file;

      if (!req.body) cloudinary.uploader.destroy(fileData.filename);
      const rankId = await Rank.findOne({ level: 1 });
      const saveExperience = new Experiences({
        ny_id: req.userId,
        level: rankId._id,
        accumulated: 0,
      });
      const result = await saveExperience.save();
      const savePet = new Info({
        name,
        gender,
        old,
        height,
        weight,
        skill,
        img: fileData?.path,
        cloudinary_id: fileData?.filename,
        phone,
        address,
        user: req.userId,
        rank_level: result._id,
      });

      const resultAll = await savePet.save();
      const user = await User.findById(savePet.user);

      await user.updateOne({ info_id: resultAll._id });

      res.json({
        success: true,
        mess: "add info for pet success!",
        pet: savePet,
      });
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const option = req.body;
    const fileData = req.file;

    try {
      const deletePet = await Info.findById(id);
      if (deletePet.cloudinary_id){
        await cloudinary.uploader.destroy(deletePet.cloudinary_id);
      }
        

      const update = await Info.findByIdAndUpdate(
        id,
        { option, img: fileData?.path, cloudinary_id: fileData?.filename },
        { new: true }
      );
      res.json({ success: true, mess: "update success", update });
    } catch (err) {
      console.log(err);
    }
  },

  findInfoId: async (req, res) => {
    const id = req.params.id;

    if (!id) res.status(401).json({ success: false, mess: "not found id" });
    try {
      const getPet = await Info.findOne({ user: id }).populate({
        path: "rank_level",
        populate: {
          path: "level",
          model: "rank",
        },
      });

      res.json(getPet);
    } catch (err) {
      console.log(err);
    }
  },

  findAll: async (req, res) => {
    try {
      const findAll = await Info.find().populate({
        path: "rank_level",
        populate: {
          path: "level",
          model: "rank",
        },
      });
      if (findAll) {
        res.json(findAll);
      } else {
        return res.status(401).json("not found all info user");
      }
    } catch (error) {
      console.log(error);
    }
  },

  fliter: async (req, res) => {
    var height = req.body.height;
    var weight = req.body.weight;
    var old = req.body.old;
    var rank = req.body.rank;

    var findRank = await Rank.find({ name: rank });

    var query = {};
    if (findRank.id) query.rank = findRank.id;
    if (height) query.height = height;
    if (weight) query.weight = weight;
    if (old) query.old = old;
    Info.find(query, (err, users) => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(users);
    });
  },
};

module.exports = infoController;
