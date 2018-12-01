var express = require('express');
var router = express.Router();

const config = require('../config.json')
const nano = require('nano')(config.couchdb_url);
const accounts = nano.db.use('accounts');
const getAccount = async function(id) {
  return accounts.get(id);
}

const process = async function(req,res) {
  var id = req.query.id
  if (id.startsWith("0x")) {
    id = id.substring(2);
  }
  var account;
  try {
    account = await getAccount(id);
    account['totalDeposit'] =  0;
    for (var deposit of account.deposits) {
      var currentAmount = 0;
      try {
        currentAmount = parseInt(deposit.amount);
      } catch (error) {
        //ignore
        console.log(error);
      }
      if (!isNaN(currentAmount) ) {
        account['totalDeposit'] +=  currentAmount;
      }
    }
  } catch (error) {
    console.log(error);
    console.log(id+" not found")
  }
  res.render('account', { account: account });
}
/* GET home page. */
router.get('/', function(req, res, next) {
  process(req,res);
});

module.exports = router;
