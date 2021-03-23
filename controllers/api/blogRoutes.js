//posting to /blogs

const router = require('express').Router();
const withAuth = require('../../utils/auth')
const { User, Blog } = require('../../models')

router.get("/:id", async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "description", "title", "createdAt"],
            include: [
            { model: User, attributes: ["name"] },
            ]
        })
        
        console.log("TEST" + blogData)
        if (!blogData) {
            res.status(404).json({
                message: "No post found with this id"
            });
            return;
        }

        const blog = blogData.get({ plain: true });
        console.log(blog)

        res.render('singlePost', {
            blog,
            loggedIn: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err)
    }
})


  
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
