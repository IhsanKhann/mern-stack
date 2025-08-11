import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true
    },
})

// hash the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10); //salt(random string) of 10 charachters
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// a fucntion which takes the password, takes the salt.(salting is generating a random string and putting in front of the string.)


// compare the password:
userSchema.methods.comparePassword = async function(passwordToCheck){
    return await bcrypt.compare(passwordToCheck, this.password);
}

const User = mongoose.model("users", userSchema);
export default User;

