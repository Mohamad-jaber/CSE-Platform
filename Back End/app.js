import cors from 'cors'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express';
import connectDB from './DB/connection.js';
import * as allRouter from './module/index.router.js';
import downloadRouter from './service/download.js';

const app = express();

connectDB;

app.use(cors());
const port = process.env.PORT;
app.use(express.json());
const baseUrl = process.env.BASEURL;
// app.use(`${baseUrl}/uploads`,express.static('./uploads'));
app.use(`${baseUrl}/auth`,allRouter.authRouter);
app.use(`${baseUrl}/course`,allRouter.courseRouter);
app.use(`${baseUrl}/submission`,allRouter.SubmissionRouter);
app.use(`${baseUrl}/download`, downloadRouter);
app.use(`${baseUrl}/material`, allRouter.MaterialRouter);
app.use("*",(req,res)=>{
    res.json({message:'page not found'});
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))