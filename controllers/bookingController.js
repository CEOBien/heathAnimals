const Info = require('../models/infoSchema');
const Booking = require('../models/bookingSchema');
const Experiences = require('../models/experienceSchema');
const User = require('../models/userSchame');
const experienceController = require('../controllers/experienceController');

const bookingController = {
    add: async (req,res) => {
        const id = req.params.id;
        const {hour} = req.body;

        try {
            
            const saveBooking = new Booking({user_id:'63f35ab7f8f82c929334b239',ny_id:id,amount:1,hour});
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