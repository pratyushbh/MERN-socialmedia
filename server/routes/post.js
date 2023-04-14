import express from 'express'
import { getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/post.js'

const postRouter=express.Router()

postRouter.get('/',getPosts);
postRouter.post('/',createPost);
postRouter.patch("/:id",updatePost);
postRouter.delete("/:id",deletePost);
postRouter.patch("/:id/likePost",likePost)


export default postRouter