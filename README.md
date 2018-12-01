### pipet
Browser for Liquidity Network

This project is a offchain hub explorer for [Liquidity.Network](http://liquidity.network)

It is built on node.js express framework with pug templates.

The backend driving this app is a couchdb database. Data from the hub should be loaded to couchdb and a config.json file should be created at the root of this project. A sample config entry is shown below.

```
{
    "couchdb_url":"http://username:password@localhost:5984"
}
```

This project is currently hosted [here](http://pipet.xyz)

### Name Origin :

The definition of Pipet is, its a tool used to measure and transfer small quantities of liquid. 

That named suits very well for a hub explorer for liquidity network

Data strcutures and migration script for looading data to couchdb will be opensourced if there is a demand.

