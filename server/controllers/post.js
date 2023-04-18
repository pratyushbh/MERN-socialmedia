import mongoose from "mongoose";
import postModel from "../models/postMessage.js"

export const getPosts= async(req,res)=>{
    const {page}=req.query;
    try {
        const LIMIT=8;
        const startIndex=(Number(page)-1)*LIMIT;
        const total=await postModel.countDocuments({});
        const postMessage=await postModel.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data:postMessage,currentPage:Number(page),numberOfPage:Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const commentPost=async(req,res)=>{
    try {
        const {id}=req.params;
        const {finalComment}=req.body;
        const post=await postModel.findById(id);
        post.comments.push(finalComment)
        
        const updatedPost= await postModel.findByIdAndUpdate(id,post,{new:true});
        console.log(updatedPost)
        res.json(updatedPost)
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch= async(req,res)=>{
    const {searchQuery,tags}=req.query
    try {
        const title=new RegExp(searchQuery, 'i');
        const posts=await postModel.find({$or:[{title}, {tags:{$in:tags.split(',')}}]});
        res.json({data: posts});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const getPostById = async (req, res) => { 
    const { id } = req.params;
    try {
        const post = await postModel.findById(id)
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost= async (req,res)=>{
    const post=req.body;

    const newPost=new postModel({...post,creator: req.userId,createdAt: new Date().toISOString()})
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
    console.log(_id);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post with that id');
    }
    const result=await postModel.findByIdAndRemove(_id);
    console.log(result);
    res.json({message:"post deleted successfully"})
}
export const likePost= async(req,res) =>{
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postModel.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}