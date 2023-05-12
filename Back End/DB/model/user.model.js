// import mongoose from "mongoose";
// const userSchame = new mongoose.Schema({
//     userName:{
//         type:String,
//         required:true,
//     }, 
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     phone:{
//         type:String,
//     },
//     confirmEmail:{
//         type:Boolean,
//         default:false,
//     },
//     profilePic:{
//         type:String,
//     },
//     lastSeen:Date,
//     coverPic:Array,
//     gender:{
//         type:String,
//         enum:['male','female'],
//         default:'male',
//     },
//     code:String
// },{timestamps:true});
// export const userModel = mongoose.model('user',userSchame);