const Experiences = require('../models/experienceSchema');
const User = require('../models/userSchame');

const Uplevel = {
    upLevel: async (req,res) => {
        
        const check = await Experiences.findOne('accumulated',10);
        if(check) res.json('Chúc mừng bạn đã tăng cấp!');
    }
    
}

module.exports = Uplevel;