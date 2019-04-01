# CRUD Application
This application has been made using node.js, express.js and mongoDB.
The mongoDB server is run locally here.

	mkdir data
	mkdir data/db
	mongod --dbpath ./data/db/ 

	npm init
	npm i --save express pug nodemon mongoose body-parser bower
	bower install jquery

	mongo --host localhost --port 27017

	use userbase
	db.createCollection('users');
	
	db.users.insert({name:"John Moneybags",phone:000000,email: "money@bags.org", country: "United States of America", address: 
	"Pumpkin str. 1"}) 

nodemon
