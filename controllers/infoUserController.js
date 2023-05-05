const Info = require("../models/infoUserSchema");
const User = require("../models/userSchame");
const cloudinary = require("cloudinary").v2;

const infoUserController = {
  addPets: async (req, res) => {
    const { name, gender, old, phone, address, character, description, appearance } = req.body;

    try {
      const fileData = req.file;

      if (!req.body) cloudinary.uploader.destroy(fileData.filename);

      const savePet = new Info({
        name,
        gender,
        old,
        img: fileData.path,
        phone,
        address,
        description,
        character,
        appearance,
        cloudinary_id: fileData?.filename,
        
        user: req.userId,
      });

      await savePet.save();
      res.json({ success: true, mess: "add info successfully!", pet: savePet });
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
      if (deletePet.cloudinary_id) {
        await cloudinary.uploader.destroy(deletePet.cloudinary_id);
      }
      

      const update = await Info.findByIdAndUpdate(
        id,
        {  img: fileData?.path, cloudinary_id: fileData?.filename, ...option, },
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
      const getPet = await Info.findOne({ user: id });
      res.json(getPet);
    } catch (err) {
      console.log(err);
    }
  },

  AllInfo: async (req, res) => {
    try {
      const getAllPet = await Info.find();
      res.json(getAllPet);
    } catch (err) {
      console.log(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const getAllPet = await Info.findByIdAndDelete(id);
      res.json(getAllPet);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = infoUserController;
