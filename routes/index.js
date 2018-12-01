var express = require('express');
var router = express.Router();
const config = require('../config.json');
const nano = require('nano')(config.couchdb_url);
const accounts = nano.db.use('accounts');
const transfers = nano.db.use('transfers');
const getTransfers = async function() {
  const q = {
    selector: {
          "id": {
          "$gt": 1
      }
    },
    fields: [ "id", "amount", "wallet", "recipient","sent" ],
    sort:[{"id":"desc"}],
    limit:10
  };
  return transfers.find(q);
}
const getLatestAccounts= async function() {
  const q = {
    selector: {
          "_id": {
          "$gt": "0"
      }
    },
    fields: [ "_id", "deposits", "withdrawls" ],
    sort:[{"_id":"desc"}],
    limit:10
  };
  return accounts.find(q);
}
const getDepositCount = async function() {
  return accounts.view('accounts','depositcount');
}
const getTotalDeposits = async function() {
  return accounts.view('accounts','totaldepositamount');
}
const getWithdrawalCount = async function() {
  return accounts.view('accounts','withdrawalcount');
}
const getTotalWithdrawals = async function() {
  return accounts.view('accounts','totalwithdrawalamount');
}
const getWithdrawalRequestCount = async function() {
  return accounts.view('accounts','withdrawalrequestcount');
}
const getTotalTransfers = async function() {
  return accounts.view('accounts','totaltransferamount');
}
const getTransferCount = async function() {
  return accounts.view('accounts','transfercount');
}
const getAccountCount = async function() {
  return accounts.view('accounts','accountcount');
}
const process = async function(res) {
  var latestTransfers = await getTransfers();
  var latestAccounts = await getLatestAccounts();
  var totalDepositsRaw = await getTotalDeposits();
  var totalDeposits = (totalDepositsRaw && totalDepositsRaw.rows && totalDepositsRaw.rows.length>0 && totalDepositsRaw.rows[0].value)?totalDepositsRaw.rows[0].value:0;
  var depositCountRaw = await getDepositCount();
  var depositCount = (depositCountRaw && depositCountRaw.rows && depositCountRaw.rows.length>0 && depositCountRaw.rows[0].value)?depositCountRaw.rows[0].value:0;
  var withdrawalCountRaw = await getWithdrawalCount();
  var withdrawalCount = (withdrawalCountRaw && withdrawalCountRaw.rows && withdrawalCountRaw.rows.length>0 && withdrawalCountRaw.rows[0].value)?withdrawalCountRaw.rows[0].value:0;
  var totalWithdrawalasRaw = await getTotalWithdrawals();
  var totalWithdrawalas = (totalWithdrawalasRaw && totalWithdrawalasRaw.rows && totalWithdrawalasRaw.rows.length>0 && totalWithdrawalasRaw.rows[0].value)?totalWithdrawalasRaw.rows[0].value:0;
  var withdrawalRequestCountRaw = await getWithdrawalRequestCount();
  var withdrawalRequestCount = (withdrawalRequestCountRaw && withdrawalRequestCountRaw.rows && withdrawalRequestCountRaw.rows.length>0 && withdrawalRequestCountRaw.rows[0].value)?withdrawalRequestCountRaw.rows[0].value:0;
  var totalTransfersRaw = await getTotalTransfers();
  var totalTransfers = (totalTransfersRaw && totalTransfersRaw.rows && totalTransfersRaw.rows.length>0 && totalTransfersRaw.rows[0].value)?totalTransfersRaw.rows[0].value:0;
  var transferCountRaw = await getTransferCount();
  var transferCount = (transferCountRaw && transferCountRaw.rows && transferCountRaw.rows.length>0 && transferCountRaw.rows[0].value)?transferCountRaw.rows[0].value:0;
  var accountCountRaw = await getAccountCount();
  var accountCount = (accountCountRaw && accountCountRaw.rows && accountCountRaw.rows.length>0 && accountCountRaw.rows[0].value)?accountCountRaw.rows[0].value:0;

  for (var latestAccount of latestAccounts.docs) {
    latestAccount['totalDeposit']=0;
    for (var deposit of latestAccount.deposits) {
      var currentAmount = 0;
      try {
        currentAmount = parseInt(deposit.amount);
      } catch (error) {
        //ignore
        console.log(error);
      }
      if (!isNaN(currentAmount) ) {
        latestAccount['totalDeposit'] +=  currentAmount;
      }
    }
  }
  res.render('index', { latestTransfers: latestTransfers.docs,latestAccounts: latestAccounts.docs,
    totalDeposits: totalDeposits,
    depositCount: depositCount,
    withdrawalCount: withdrawalCount,
    totalWithdrawalas: totalWithdrawalas,
    withdrawalRequestCount: withdrawalRequestCount,
    totalTransfers: totalTransfers,
    transferCount: transferCount,
    accountCount: accountCount
   });
}
/* GET home page. */
router.get('/', function(req, res, next) {
  process(res);
});

module.exports = router;
