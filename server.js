'use strict';
/**
 * Module dependencies.
 */

var init = require('./config/init')(),   //in config folder, sets the correct environment (e.g: production, development, etc...)
	config = require('./config/config'), //in config folder
	mongoose = require('mongoose'),
	chalk = require('chalk'); //chalk is just a command line css display
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection

var db = mongoose.connect(config.db, function(err) {  //config.db exists in whichever NODE_ENV file got extended with all.js in env/
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application

var app = require('./config/express')(db); //db argument into main modules.export in express.js file


// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);