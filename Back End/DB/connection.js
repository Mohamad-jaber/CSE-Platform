import mysql from "mysql2";

// const connectDB = async () => {
//   // return await mongoose.connect("mongodb+srv://tariq:tariq55@cluster0.yesyf.mongodb.net/saraha")
//   return await mongoose
//     .connect(
//       "mongodb+srv://AamerGSG:AamerGSG13579@cluster0.7una7bn.mongodb.net/users",
//     )
//     .then((result) => {
//       console.log(`connectionDB `);
//     })
//     .catch((err) => {
//       console.log(`error to connect db`, err);
//     });
// };

// import express from 'express';
// const app = express();

// const mySql= require('mysql2');
const connectDB=mysql.createConnection({
    host:'localhost',
    database:'cse',
    user:'root',
    password:''
})

export default connectDB;
