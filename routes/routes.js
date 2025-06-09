const express = require('express');
//setting the router
const router = express.Router();
const getAllGoods = require('../controllers/controllers');

//setting the http methods and their controllers and routes
router.route('/')
      .get(getAllGoods);


//exporting the router for external use
module.exports = router;