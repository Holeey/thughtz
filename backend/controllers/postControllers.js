const postData = require('../model/postModel.js');
const userData = require('../model/userModel.js');

exports.getPosts = async (req, res) => {
    const posts = await postData.find({ user: req.user.id });
    res.status(200).json(posts);
};

exports.createPost = async (req, res) => {
    if (!req.body.postText) {
        res.status(400);
        throw new Error('Please add text field');
    }
    const post = await postData.create({
        user: req.user.id,
        postText: req.body.postText,
    });
    res.status(200).json(post);
};

exports.updatePost = async (req, res) => {
    // Get post by id
    const post = await postData.findById(req.params.id);
    // Verify post
    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }
    // Get user
    const user = await userData.findById(req.user.id);
    // Verify user
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    if (post.user.toString() !== user.id) {
        res.status(400);
        throw new Error('User not authorized');
    }
    // If verified, update user's post
    const updatedPost = await postData.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedPost);
};

exports.deletePost = async (req, res) => {
    // Get post
    const post = await postData.findById(req.params.id);
    // Verify post
    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }
    // Get user by id
    const user = await userData.findById(req.user.id);
    // Verify user
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    if (post.user.toString() !== user.id) {
        res.status(400);
        throw new Error('User not authorized');
    }
    // If verified, delete user's post
    await post.deleteOne();

    res.status(200).json({ id: req.params.id });
};
