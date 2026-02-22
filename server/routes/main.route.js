const express = require('express');
const router = express.Router();
const servicesRoute = require('./services.route');
const postsRoute = require('./posts.route');

router.use('/services', servicesRoute);
router.use('/posts', postsRoute);

module.exports = router;