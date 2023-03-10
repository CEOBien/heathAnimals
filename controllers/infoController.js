const Info = require('../models/infoSchema');
const User = require('../models/userSchame');
const Experiences = require('../models/experienceSchema');
const Rank =  require('../models/rankSchema');
const cloudinary = require('cloudinary').v2;


const infoController = {
  
    addPets: async (req,res)=>{
        const {name,gender,old,height,weight,skill,phone,address,} = req.body;
        
        try {
            const fileData = req.file;
            
            if(!req.body) cloudinary.uploader.destroy(fileData.filename);
            const rankId = await Rank.findOne({level:1});
            const saveExperience = new Experiences({ny_id:'63f35ad2f8f82c929334b23f',level:rankId._id,accumulated:0});
            const result = await saveExperience.save();
            const savePet = new Info({name,gender,old,height,weight,skill,img:fileData?.path,
                cloudinary_id:fileData?.filename,phone,address,user:'63f35ad2f8f82c929334b23f',rank_level:result._id});
            
            
            const resultAll =  await savePet.save();
            const user = await User.findById(savePet.user);
            
            await user.updateOne({info_id:resultAll._id});

            res.json({success:true,mess:'add info for pet success!',pet:savePet});
        } catch (err) {
            console.log(err);
        }

        

    },

    update: async (req,res)=>{
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
            const getPet = await Info.findOne({user:id}).populate({
                path: 'rank_level',
                populate: {
                  path: 'level',
                  model: 'rank',
                },
              })
              
            res.json(getPet);
        } catch (err) {
            console.log(err);
        }
    },

    findAll: async (req, res)=>{
        try {
            const findAll = await Info.find().populate({
                path: 'rank_level',
                populate: {
                  path: 'level',
                  model: 'rank',
                },
              });
            if(findAll){
                res.json(findAll);
            }else{
                return res.status(401).json('not found all info user');
            }

        } catch (error) {
            console.log(error)
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
    fliter: async (req,res) => {
        var height = req.body.height;
        var weight = req.body.weight;
        var old = req.body.old;
        var query={}
        if(height)query.height= height;
        if(weight)query.weight= weight;
        if(old)query.old = old;
        Info.find(query, (err, users) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json(users);
      });
    }
}

module.exports = infoController;