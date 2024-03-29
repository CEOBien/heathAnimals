const Info = require('../models/infoSchema');
const Booking = require('../models/bookingSchema');
const Experiences = require('../models/experienceSchema');
const Rank = require('../models/rankSchema');


const experienceController = {
    getId: async (req,res,id) => {
      try {
        
        const experience = await Experiences.findOne({ ny_id: id }, 'accumulated');
        //rank bac diem tich luy =10
        const rank = await Rank.findOne({ accumulated: experience.accumulated });
        
         
        if(rank){
          const update = await experience.updateOne({level:rank._id});
          
          return update;
        }
        
        
      } catch (err) {
        return console.log(err);
      }
      
         
    },
};

module.exports = experienceController;