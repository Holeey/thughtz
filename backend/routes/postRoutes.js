const express = require('express');
const { updatePost, getPosts, createPost, deletePost } = require('../controllers/postControllers.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getPosts);

router.post('/', protect, createPost);

router.put('/:id', protect, updatePost);

router.delete('/:id', protect, deletePost);

module.exports = router;








// to simplify the routes use:
// router.route('/').get(getPosts).post(createPost)
// router.route('/:id').put(updatePost).delete(deletePost)