const Pets = require('../models/petSchema');


const petsController = {
    addPets: async (req,res)=>{
        const {name,gender,old,breed,img,allergy} = req.body;
        try {
            const savePet = new Pets({name,gender,old,breed,img,allergy,user:req.userId});

            await savePet.save();
            res.json({success:true,mess:'add info for pet success!',pet:savePet});
        } catch (err) {
            console.log(err);
        }

        

    },
    delete: async (req,res)=>{
        try {
            const deletePet = await Pets.findByIdAndDelete(req.params.id);
            res.json({success:true,mess:'deleted success!'});
        } catch (err) {
            console.log(err);
        }
        

    }
}

module.exports = petsController;