var express = require('express');
var router = express.Router();
const config = require('../config.json');
const nano = require('nano')(config.couchdb_url);
const transfers = nano.db.use('transfers');
const getTransfer = async function(id) {
  return transfers.get(id);
}

const process = async function(req,res) {
  var id = req.query.id;
  console.log("ID "+id);
  var transfer = await getTransfer(id);
  res.render('transfer', { transfer: transfer });
}
/* GET home page. */
router.get('/', function(req, res, next) {
  process(req,res);
});

module.exports = router;
