import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import config from "../config.js"
// now code the following:

function createAccessToken(user){
    const token = jwt.sign(
        {id:user._id},
        config.JWT_SECRET,
        {expiresIn: config.JWT_EXPIRE}
    )

    return token;
}

const Login = async(req,res) => {
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(user){
        const isPasswordValid = await User.comparePassword(password);
        if(isPasswordValid){
            const accessToken = createAccessToken(user);
            // no cookie and no refrest Token.
            return res.status(200).json({
                success: true,
                message: "Login successful.",
                accessToken // return the token in response
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message:"Invalid password."
            })
        }
    }
    // else
    return res.status(400).json({
        success: false,
        message:"User not found.",
        // undefined or null object sent in response.
    })
  }
  catch(error){
    return res.status(400).json({
        success: false,
        message:"Error while logging in.",
        error: error.message
    })
  }
};

const SignUp = async(req,res) => {
    try{
        // first take credentials.
        const {name,email,password} = req.body ;

        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({
                success: false,
                message:"User already exists.",
            })
        }

        const newUser = await User.create({
            name,
            email,
            password,
        })       
        // now i would create access token.
        const accessToken = createAccessToken(newUser);
        return res.status(200).json({
            success: true,
            message: "Signup successful.",
            accessToken,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while signing up.",
            error: error.message
        })
    }
};

const getCurrentUser = async(req,res) => {
    try{
        const user = await User.findById(req.user.id);
        return res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            user,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while fetching user.",
            error: error.message
        })
    }
}

export {
    Login,
    SignUp,
    getCurrentUser,
}