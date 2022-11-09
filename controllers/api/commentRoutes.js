const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:post_id', withAuth, async (req, res) => {
    try {
        const newPost = await Comment.create({
            text: req.body.text,
            username: req.session.username,
            post_id: req.params.post_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;