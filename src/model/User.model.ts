import mongoose, { Schema, Document } from "mongoose";


// in typescript datatype of the variables used in program is a must to define and that process of defining is called "Interface" thats why we used "export interface" "Message" is name of the Schema. Now this schema will ultimately be saved in the Db as documents of "Mongoose" so we wrote "extends Document"
export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;

    // "verifyCode" is used to verify the user. VerifyCode is saved in Db. 
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;

    // every message the user sends or recieves are stored in a different "Document" but i want it to be shown to the user as well so this "message" Array is created of type "Message" defined above.
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid Email Address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verification Code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verification Code Expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})  

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;