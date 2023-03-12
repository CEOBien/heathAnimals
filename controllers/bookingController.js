const Info = require('../models/infoSchema');
const Booking = require('../models/bookingSchema');
const Experiences = require('../models/experienceSchema');
const User = require('../models/userSchame');
const Wallet = require('../models/walletSchema');
const intermediarySchema = require('../models/intermediarySchema');
const experienceController = require('../controllers/experienceController');

const bookingController = {
    add: async (req,res) => {
        const id = req.params.id;
        const {hour,} = req.body;
        
        const coin = await Wallet.findOne({userId:'63fa0aaa5c858509e30e2d15'});
        const balance = coin.coin;
        const ny = await Info.findById(id);
        const totalTimeRent = ny.rent_cost * hour;
        if(balance < totalTimeRent){
            return res.status(401).json({mess:'ban khong du tien ma doi hop tac?'});
        }
        try {
            
            const saveBooking = new Booking({user_id:req.userId,ny_id:id,amount:1,hour});
            const result =  await saveBooking.save();

            const experience = await Experiences.findOne({ny_id:id});

            if (experience) {
                const update = experience.accumulated + 1;
                await experience.updateOne({accumulated:update});
                // res.json({mess:'successfully!',data:experience});
            }

            experienceController.getId(req,res,id);

           
            
            
            
        } catch (err) {
            console.log(err);
        }

    }
};

module.exports = bookingController;