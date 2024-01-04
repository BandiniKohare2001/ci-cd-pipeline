import express from  'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from './models/User.js';



const app =express();
app.use(express.json());

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn){
        console.log("MongoDB connected")
    }
};

connectDB();

app.post('/signup', async(req, res)=>{
    const { email, password, fullName} = req.body;
    try{
        const newUser = new User({
            email: email,
            password:password,
            fullName: fullName
        });
        const saveUser = await newUser.save();

        res.json({
            success: true,
            data: saveUser,
            message: "Successfully Signup"
        })
    } catch(err){
        res.json({
            success : false,
            message: err.message
        })
    }
})


app.get('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        const checkUser = await User.findOne({email, password});

     res.json({
            success: true,
            data: checkUser,
            message: "Successfully Login"
        })
    } catch(err){
        res.json.status(200)({
            success : false,
            message: err.message
        })
    }
})


const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on port 5000`);
});