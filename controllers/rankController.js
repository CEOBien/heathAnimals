const Rank = require('../models/rankSchema');
const cloudinary = require('cloudinary').v2;

const rankController = {
    add: async (req,res) => {
        const {level,name} = req.body;
        const fileData = req.file;
        if(!level || !name){
            cloudinary.uploader.destroy(fileData?.filename);
            return res.status(400).json('level và tên không được để trống');
        };
        Rank.findOne({level:level,name:name}, (err,data) => {
            if (err) throw err;

            if (data) {
            // Record exists
            cloudinary.uploader.destroy(fileData?.filename);
            res.status(401).json({mess:'level exists:', data:data});
            }
        });

        try {
            const saveRank = new Rank({level,name,img:fileData?.path,cloudinary_id:fileData?.filename});
            
            await saveRank.save();

            res.json(saveRank)

        } catch (err) {
            console.log(err);
        }
        


    },

    put: async (req,res) => {
        const level = req.body.level;
        const name = req.body.name;
        const id = req.params.id;
        const fileData = req.file;
        Rank.findOne({level:level,name:name}, (err,data) => {
            if (err) throw err;

            if (data) {
            // Record exists
            cloudinary.uploader.destroy(fileData?.filename);
            res.status(401).json({mess:'level exists:', data:data});
            }
        });

        try {
            const deleteImg = await Rank.findById(id);
            console.log(deleteImg.cloudinary_id);
            cloudinary.uploader.destroy(deleteImg.cloudinary_id);
            
            const updateRank = await Rank.findByIdAndUpdate(id,{level,name,img:fileData?.path,cloudinary_id:fileData?.filename},
                 {new:true}
                );
                res.json(updateRank);


        } catch (err) {
            console.log(err);
        }

    },

    delete: async (req,res) => {
        const id = req.params.id;
        try {
            const check = await Rank.findById(id);
            cloudinary.uploader.destroy(check.cloudinary_id);

            await Rank.findByIdAndDelete(id);
            res.json("deleted successfully");
        } catch (err) {
            console.log(err);
        }
        
    },

    getId: async (req,res) => {
        const id = req.params.id;
        try {
            const findId = await Rank.findById(id);
            res.json(findId);
        } catch (err) {
            console.log(err);
        }
    },

    getAll: async (req,res) => {
        const id = req.params.id;
        try {
            const find = await Rank.find(id);
            res.json(find);
        } catch (err) {
            console.log(err);
        }
    },
}
module.exports = rankController;