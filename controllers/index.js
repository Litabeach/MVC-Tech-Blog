const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const blogRoutes = require('./api/blogRoutes');
const homeRoutes = require('./homeRoutes');
// const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/', homeRoutes);
router.use('/blogs', blogRoutes);
// router.use('/dashboard', dashboardRoutes);

module.exports = router;
