const User = require("../models/userSchame.js");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const {CourierClient} = require("@trycourier/courier");
require('dotenv').config();


const { Vonage } = require('@vonage/server-sdk')





const authController = {
    resgister: async (req,res)=>{
		const email = req.body.email;
        const username = req.body.usename;
        const password = req.body.password;
       
    
        if(!username || !password){
            return res.status(400).json({success:false, mess:'usename or password empty' });
            
        };
    
        try {
            const user = await User.findOne({username});
            if(user)
                return res.status(400).json({success:false, mess:'Username already exited'})

            const hashPassword = await argon2.hash(password);
            const newUse = new User({email,username, password: hashPassword});
            await newUse.save();


            //return token
            const accessToken = jwt.sign({userId: newUse._id}, process.env.ACCESS_TOKEN_SECRET);

            res.json({success:true, mess:"success", accessToken});
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    
    },

    login: async (req,res)=>{
        const username = req.body.usename;
        const password = req.body.password;
       
	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		console.log(user);
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'user not exits' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
    },

	changePassword: async(req,res)=>{
		//get password
		const password = req.body.password;
		const newpassword = req.body.newpassword
		const id = req.params.id;
		
		try {
			const user = await User.findById(id);
			console.log(user.password);
			if(!user){
				res.status(400).json({success:false, mess:'account not exits'})
			}else{
				//verify password
				const currentPassword = await argon2.verify(user.password, password)
				
				if(currentPassword == true){

					const updatePassword = await argon2.hash(newpassword);
					const newsavePassword = await User.findByIdAndUpdate(id,{password:updatePassword},{new:true});
					res.json({success:true,mess:'change password successfully'});
					

				}else{
					res.status(400).json({success:false, mess:'password not same'});
				}
			}
		
		} catch (err) {
			console.log(err);
			res.status(500)
		}
		
	},

	getUser: async(req,res)=>{
		try {
			const getUser = await User.findById(req.params.id);
			if(!getUser){
				res.status(400).json({success:false,mess:'not found account'});
			}else{
				res.json(getUser);
			}
			
		} catch (err) {
			console.log(err);
		}
		
		
	},
	
	getAllUser: async(req,res)=>{
		try {
			const getAllUser = await User.find();
			if(!getAllUser){
				res.status(400).json({success:false,mess:'not found users'});
			}else{
				res.json(getAllUser);
			}
		} catch (err) {
			console.log(err);
		}
		
	},

	
	forgotPasswordEmail: async (req,res) =>{
		const vonage = new Vonage({
			apiKey: "e1d6072a",
			apiSecret: "bj5ZHsfkzryfXuNC"
		  })
		const from = "Vonage APIs"
		const to = "0367778384"
		const text = 'A text message sent using the Vonage SMS API'

		async function sendSMS() {
			await vonage.sms.send({to, from, text})
				.then(resp => { console.log('Message sent successfully'); console.log(resp); })
				.catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
		}

		sendSMS();

		
		 

	
			
	}

}

module.exports = authController;