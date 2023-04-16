import express from 'express'
import { getPostsBySearch,getPostById,getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/post.js'
import auth from '../middleware/auth.js';

const postRouter=express.Router()

postRouter.get('/',getPosts);
postRouter.get("/:id",getPostById);
postRouter.post('/',auth,createPost);
postRouter.patch("/:id",auth,updatePost);
postRouter.delete("/:id",auth,deletePost);
postRouter.patch("/:id/likePost",auth,likePost)
postRouter.get('/search',getPostsBySearch)


export default postRouter