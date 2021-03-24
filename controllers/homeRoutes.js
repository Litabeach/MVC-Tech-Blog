const router = require('express').Router();
const cookie = require('express').Router();
const { Blog, User } = require('../models');
// const withAuth = require('../utils/auth');

//show all blog posts at localhost:3001/
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

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get blog post by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blogs', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// app.get('/api/themeupdate/:newColor', async (req, res) => {

//   const newColor = req.params.newColor;

//   res
//     .status(200)
//     .cookie('themeColor', newColor,
//       {
//         maxAge: 90000,
//         httpOnly: true
//       })
//     .json({ message: 'Theme Changed' })
// });

//login route. If already logged in, redirect to dashboard
router.get('/login', (req, res) => {
  console.log('Cookies: ', req.cookies)
  
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res
  .cookie('connect.sid', 
  {
    maxAge: 100000,
    httpOnly: true
  })

  console.log('Cookies after creating loggedIn cookie: ', req.cookies)
  res.render('login');
});

//signup route. If already logged in, redirect to dashboard
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

router.get('/logout', (req, res) => {
  res.render('logout', {
    loggedIn: req.session.logged_in
  });
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
