const Menu = require('../models/menuCHema');
const Slider = require('../models/sliderShema')

const menuController = {
    getAll: async (req,res) =>{
        try {
            const allmenu = await Slider.find();
            res.json(allmenu);
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = menuController;