const User = require("../models/userSchame.js");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Wallet = require('../models/walletSchema');
require('dotenv').config();
const nodemailer = require("nodemailer");






const authController = {
    resgister: async (req,res)=>{
		const email = req.body.email;
        const username = req.body.usename;
        const password = req.body.password;
		const role = req.body.role;
       
    
        if(!username || !password){
            return res.status(400).json({success:false, mess:'usename or password empty' });
            
        };
    
        try {
            const user = await User.findOne({username});
            if(user)
                return res.status(400).json({success:false, mess:'Username already exited'})

            const hashPassword = await argon2.hash(password);
            const newUse = new User({email,username, role,password: hashPassword});
            await newUse.save();


            //return token
            const accessToken = jwt.sign({userId: newUse._id}, process.env.ACCESS_TOKEN_SECRET);
			const wallet = new Wallet({coin:0,userId:newUse._id});
			await wallet.save();
            res.json({success:true, mess:"success", accessToken});
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    
    },

    login: async (req,res)=>{
        const username = req.body.username;
		const password = req.body.password;
		console.log(username,password);
       
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
		
				const currentPassword = await argon2.verify(user.password, password)
				
				if(currentPassword == true){

					const updatePassword = await argon2.hash(newpassword);
					const newsavePassword = await User.findByIdAndUpdate(id,{password:updatePassword},{new:true});
					res.json({success:true,mess:'change password successfully'});
					

				}else{
					res.status(400).json({success:false, mess:'password not same'});
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
		const {email} = req.body;
		const Check = await User.findOne({email:email});
		console.log(Check);
		if(!Check) return res.status(401).json('Email does not exist!');
		
		const otp = Math.floor(Math.random() * 900000) + 100000;
		const hashOtp = await argon2.hash(otp.toString());
		const resetToken = await Check.updateOne({resetToken:hashOtp});


		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service:"gmail",
			auth: {
				user: "daohai271@gmail.com", // generated ethereal user
				pass: "czfhwpmbnrouvbos", // generated ethereal password
			},
		});
		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: "daohai271@gmail.com", // sender address
			to: email, // list of receivers
			subject: "Get Code Resetpassword", // Subject line
			text: "Mã otp  nè: " + otp + " thằng đầu buồi nhập vào nhá", // plain text body
			
		  });
		res.json(resetToken);
		  
		

	},
	newPassword: async (req,res) => {
		const {email,newpassword,code} = req.body;
		const Check = await User.findOne({email:email});
		const encode = await argon2.verify(Check.resetToken, code);
			if(encode) 
			{
				const newPassword = await argon2.hash(newpassword);
				await Check.updateOne({password:newPassword,resetToken:null});
				res.json({mess:"ok:",data:newPassword});
			}else{
				return res.status(401).json('code incorrent')
			}
	},
	deleteUser: async (req,res) => {
		const id = req.params.id;
		if(req.userId == id){
			return res.status(401).json({mess:"you can't deleted yourself", status:false})
		}
		await User.findByIdAndDelete(id);

		res.status(200).json("delete successfully");

		
	}

}

module.exports = authController;