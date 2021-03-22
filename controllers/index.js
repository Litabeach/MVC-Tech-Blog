const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const blogRoutes = require('./api/blogRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/', homeRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;
