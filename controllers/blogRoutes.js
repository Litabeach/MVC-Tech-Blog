const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // console.log(blogData)

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

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

      res.render('dash', {
          blogs,
          loggedIn: req.session.logged_in
      })

  } catch (err) {
      res.status(500).json(err)
  }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
