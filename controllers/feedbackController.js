const Feedbacks = require('../models/feedbackSchema');

const feedbackController = {
    addFeedback: async (req,res) => {
        const id = req.params.id;
        const {content,rate} = req.body;
        if (!content || !rate || rate < 1 || rate > 5) {
            return res.status(400).json({ message: 'Vui long dien lai so sao' });
          }
        try {
            const saveFeedback = new Feedbacks({content,rate,user_id:'63f35ab7f8f82c929334b239',ny_id:id});
            await saveFeedback.save();
            res.json({mess:'successfully',data:saveFeedback});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
        
    },
    updateFeedback: async (req,res) => {
        const id =req.params.id;
        const {content,rate} = req.body;
        if (!content || !rate || rate < 1 || rate > 5) {
            return res.status(400).json({ message: 'Vui long dien lai so sao' });
        };
        try {
            const update = await Feedbacks.findByIdAndUpdate(id,{content,rate},{new:true});
            res.json({mess:'successfully!', data:update});
        } catch (err) {
            console.log(err);
        }
        

    },
    deleteFeedback: async (req,res) => {
        const id = req.params.id;
        const checkCmt = await Feedbacks.findOne({_id:id});

        
        try {
            if(req.userId !== checkCmt.user_id){
                return res.json({mess:"you mustn't delete"});
            }
            await Feedbacks.findByIdAndDelete(id);
            res.json('delete successfully');
        } catch (err) {
            console.log(err);
            return res.status(500)
        }
    },

    findid: async (req,res) => {
        const id = req.params.id;
        try {
            const find = await Feedbacks.findById(id);
            res.json(find);
        } catch (err) {
            console.log(err);
        }
    },
    findAll: async (req,res) => {
        try {
            const findAllCmt = await Feedbacks.find();
            res.json(findAllCmt);
        } catch (err) {
            console.log(err);
        }
    },
    avgRate: async(req,res) => {
        const id = req.params.id;

        try {
            const idParter = await Feedbacks.find({ny_id:id});
            
            const rateParter = idParter.reduce((arr,cur) => arr.rate + cur.rate);
            const avgRateParter = rateParter / idParter.length;
            res.json(avgRateParter);

        } catch (error) {
            console.log(error);
            return res.status(401).json({mess: error})
            
        }
    }
}
module.exports = feedbackController;