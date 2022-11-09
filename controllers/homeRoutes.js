const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [
                ['date_created', 'DESC']
            ],
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts, 
            logged_in: req.session.logged_in,
            page_name: "The Tech Blog",
            title: "The Tech Blog"
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ 
                model: Post, 
                order: [
                    ['date_created', 'DESC']
                ]
            }],
        });

        const user = userData.get({ plain: true });

        const page_name = user.username + "'s Dashboard";

        res.render('dashboard', {
            ...user,
            logged_in: true,
            page_name: page_name,
            title: "Dashboard"
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login', {
        page_name: "Login",
        title: "The Tech Blog"
    });
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }

    res.render('signup', {
        page_name: "Sign Up",
        title: "The Tech Blog"
    });

});

router.get('/posts/new', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
  
    res.render('new-post', {
        page_name: "Create New Post",
        title: "The Tech Blog"
    });
    
});

module.exports = router;