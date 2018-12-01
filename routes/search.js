var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.dir(req.body);
  if (req.body && req.body.search) {
    res.redirect("/account?id="+req.body.search);
  } else {
    res.redirect("/");
  }
});

module.exports = router;
