const router = require('express').Router();
const { Blog, } = require('../../models')
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


// router.put('/:id', withAuth ,(req, res) => {
//   // Calls the update method on the Book model
//   Blog.update(
//     {
//       // All the fields you can update and the data attached to the request body.
//       title: req.body.post_name,
//       description: req.body.post_desc,
//     },
//     {
//       // Gets the books based on the isbn given in the request parameters
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedBook) => {
//       // Sends the updated book as a json response
//       res.json(updatedBook);
//     })
//     .catch((err) => res.json(err));
// });




router.delete('/:id', withAuth, async (req, res) => {
    try {
      const projectData = await Project.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!projectData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(projectData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
