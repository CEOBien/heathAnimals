// const Slider = require('../models/sliderShema');
const Slider = require('../models/sliderShema')

const cloudinary = require('cloudinary').v2;


const sliderController = {
    getAll: async (req,res) =>{
        try {
            const allmenu = await Slider.find();
            res.json(allmenu);
        } catch (err) {
            console.log(err)
        }
    },
    
    add:async(req,res)=>{
        const title = req.body.title;
        if(!title){
            res.status(401).json('title empty!!!!!!!');
        }
        try {
            const fileData = req.file;
            console.log(fileData);
            const sliderSave = new Slider({title,img:fileData?.path,cloudinary_id:fileData?.filename});
            await sliderSave.save();

            res.status(200).json({mess:'add successfully!!!',slide:sliderSave});
        } catch (err) {
            console.log(err)
        }
    },
    put:async(req,res)=>{
        const id = req.params.id;
        const title = req.body.title;
        try {
            const deletePet = await Slider.findById(id);
            await cloudinary.uploader.destroy(deletePet.cloudinary_id);
            const fileData = req.file;
            const updateSlider = await Slider.findByIdAndUpdate(id,{option,img:fileData?.path,cloudinary_id:fileData?.filename},{new:true});
            res.json({success:true, mess:'update success',updateSlider});
        }catch (err) {
            console.log(err);
        }
    },
    delete:async(req,res)=>{
        const id = req.params.id;
        try {
            
            const deleteSlider = await Slider.findById(id);
            await cloudinary.uploader.destroy(deleteSlider.cloudinary_id);
            deleteSlider.remove();
            res.json('delete successfully');
            
        } catch (err) {
            console.log(err)
        }
    },
    findId:async(req,res)=>{
        const id = req.params.id;
        try {
            const findId = await Slider.findById(id);
            res.json(findId);
        } catch (err) {
            console.log(err)
        }
        


    },
    
    fliter: async (req,res) => {
            var name = req.body.name;
        Slider.find({title: name}, (err, title) => {
            if (err) {
              console.error(err);
              return;
            }
            res.json(title);
          })
    }
    
}

module.exports = sliderController;