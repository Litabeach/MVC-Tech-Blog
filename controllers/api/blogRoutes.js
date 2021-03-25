const router = require('express').Router();
const { Blog } = require('../../models');
const Comment  = require('../../models/Comment');
const withAuth = require('../../utils/auth');


router.get('/:id', withAuth, async (req, res) => {
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

//create a new blog post 
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

//posting a comment 
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create(
      {
        ...req.body,
        user_id: req.session.user_id,
        blog_id: req.params.blog_id  
      },
      {
        where: {
          blog_id: req.params.blog_id,
          // user_id: req.session.user_id,
        }
      }
    );
  
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
  });
  


router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateBlog = await Blog.update(
      {
      ...req.body,
      user_id: req.session.user_id,
     
    },
    { 
      where: {
      id: req.params.id,
     }
    }
    );

    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy(
        {
        where: {
          id: req.params.id,
          // user_id: req.session.user_id,
        },
      }
      );
  
      if (!blogData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(projectData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
