const express = require('express');
const router = express.Router();
require('dotenv').config()

const {getLamda} = require('../controllers/lambdaController')

router.get('/', (req, res) => {
  getLamda(res)
  // res.send({a: "Yeah"})
});

module.exports = router;