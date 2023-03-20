import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/post.js';

const app=express();    

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use('/posts',postRouter)

const CONNECTION_URL= 'mongodb+srv://pratyush:pass120303@cluster0.dvhvvf3.mongodb.net/?retryWrites=true&w=majority'
const PORT=process.env.PORT||8000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{app.listen(PORT,()=>{console.log("hello world")})})
.catch((error)=>{console.log(error)})
