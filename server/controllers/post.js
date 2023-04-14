import mongoose from "mongoose";
import postModel from "../models/postMessage.js"

export const getPosts= async(req,res)=>{
    try {
        const postMessage=await postModel.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const createPost= async (req,res)=>{
    console.log(req.body);
    const post=req.body;

    const newPost=new postModel(post)
    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
export const updatePost=async (req,res)=>{
    const {id:_id}=req.params;
    const post= req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post with that id');
    }
    const updatedPost= await postModel.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatedPost);
}
export const deletePost=async (req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post with that id');
    }
    await postModel.findByIdAndRemove(_id);
    res.json({message:"post deleted successfully"})
}
export const likePost= async(req,res) =>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post with that id');
    }
    const post= await postModel.findById(_id);
    const updatedPost=await postModel.findByIdAndUpdate(_id,{likeCount:post.likeCount+1},{new:true})

    res.json(updatedPost);
}