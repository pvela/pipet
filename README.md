### pipet
Browser for Liquidity Network

This project is an offchain hub explorer for [Liquidity.Network](http://liquidity.network)

It is built on node.js express framework with pug templates.

The backend driving this app is an [apache couchdb](http://couchdb.apache.org/) database. Data from the hub should be loaded to couchdb and a config.json file should be created at the root of this project. 

A sample config entry is shown below.

```
{
    "couchdb_url":"http://username:password@localhost:5984"
}
```
Table Design :

Following 3 databases created :
1. Wallets
This represents all the wallets registered in the hub

2. Transfers
All transactions from the hub is stored in this DB

3. Accounts
Account details of each wallet is stored in this DB

Each database has its own views to make it faster for responding to API requests from dashboard (aggregated data).

List of views

accountcount - to get the count of wallet accounts
depositcount - to get the count of deposits
totaldepositamount - to get the total deposit amount
totaltransferamount - to get the total transfer amount
totalwithdrawalamount - to get the total withdrawal amount
transfercount - to get the count of transfers
withdrawalcount - to get the count of withdrawals
withdrawalrequestcount - to get the count of withdrawal requests
totalamount - To calculate the total amount of given account


This project is currently hosted [here](http://pipet.xyz)

### Name Origin :

The definition of Pipet is, its a tool used to measure and transfer small quantities of liquid. 

That named suits very well for a hub explorer for liquidity network

Data strcutures and migration script for looading data to couchdb will be opensourced if there is a demand.

