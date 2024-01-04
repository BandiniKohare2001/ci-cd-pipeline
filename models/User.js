import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: [true, "Password ids required"]
    },
    fullName:{
        type : String,
        require: true
    }

},{
    timestamps: true
}
);

 const User = model('User', UserSchema);
 export default User;