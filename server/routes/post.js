import express from 'express'
import { commentPost,getPostsBySearch,getPostById,getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/post.js'
import auth from '../middleware/auth.js';

const postRouter=express.Router()

postRouter.get('/',getPosts);
postRouter.post('/',auth,createPost);
postRouter.get('/search',getPostsBySearch)
postRouter.get("/:id",getPostById);
postRouter.patch("/:id",auth,updatePost);
postRouter.delete("/:id",auth,deletePost);
postRouter.patch("/:id/likePost",auth,likePost)
postRouter.post('/:id/commentPost',auth,commentPost)


export default postRouter