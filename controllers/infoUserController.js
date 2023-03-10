const Info = require('../models/infoUserSchema');
const cloudinary = require('cloudinary').v2;


const infoUserController = {
  
    addPets: async (req,res)=>{
        const {name,gender,old,phone,address,} = req.body;
        
        try {
            const fileData = req.file;
            
            if(!req.body) cloudinary.uploader.destroy(fileData.filename);
           
            const savePet = new Info({name,gender,old,img:fileData.path,phone,address,cloudinary_id:fileData?.filename,user:req.userId});

            await savePet.save();
            res.json({success:true,mess:'add info for pet success!',pet:savePet});
        } catch (err) {
            console.log(err);
        }

        

    },

    update:async (req,res)=>{
        const id = req.params.id;
        const option = req.body;
       
        
        try {
            const deletePet = await Info.findById(id);
            await cloudinary.uploader.destroy(deletePet.cloudinary_id);
            const fileData = req.file;
            
            
            const update = await Info.findByIdAndUpdate(id,{option,img:fileData?.path,cloudinary_id:fileData?.filename},{new:true});
            res.json({success:true, mess:'update success',update});
        } catch (err) {
            console.log(err);
        }
        
    },

    findInfoId: async (req,res)=>{
        const id = req.params.id;
        if(!id)
            res.status(401).json({success:false,mess:'not found id'});
        try {
            const getPet = await Info.findById(id);
            res.json(getPet);
        } catch (err) {
            console.log(err);
        }
    },

    AllInfo: async (req, res)=>{
        try {
            const getAllPet = await Info.find();
            res.json(getAllPet);
        } catch (err) {
            console.log(err);
        }
    },

    delete: async (req,res)=>{
        try {
            const deletePet = await Info.findById(req.params.id);
            await cloudinary.uploader.destroy(deletePet.cloudinary_id);
            deletePet.remove();
            
            res.json({success:true,mess:'deleted success!'});
        } catch (err) {
            console.log(err);
        }
        

    },
    
}

module.exports = infoUserController;