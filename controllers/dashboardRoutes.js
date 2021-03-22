const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ["id", "title", "description", "createdAt"],
            // include: [
            // { model: User, 
            // attributes: ["name"] },
            //     include: {
            //         model: User, 
            //         attributes: ['name'],
            //     }
            // }]
        })
        
        console.log("TEST" + blogData)
        if (!blogData) {
            res.status(404).json({
                message: "No post found with this id"
            });
            return;
        }
  
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
       console.log(blogs)
  
        res.render('dashboard', {
            blogs,
            loggedIn: req.session.logged_in
        })
  
    } catch (err) {
        res.status(500).json(err)
    }
  })

  module.exports = router;