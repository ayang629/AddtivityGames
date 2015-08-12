'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'), //file system library for NodeJS
	http = require('http'),
	https = require('https'),
	express = require('express'),
	morgan = require('morgan'), //used for logging with express
	bodyParser = require('body-parser'), //express middleware for parsing a body into req.body stuff
	session = require('express-session'), //express middleware for creating, maintaining, and ending sessions
	compress = require('compression'), //express middleware for compression
	methodOverride = require('method-override'), //express middleware for overriding HTTP POST requests and other queries
	cookieParser = require('cookie-parser'), // express middleware
	helmet = require('helmet'), //express middleware for HTTP security
	passport = require('passport'), //express middleware for authentication
	mongoStore = require('connect-mongo')({ //express middleware to handle mongo sessions (whether to reuse mongo connecions and stuff like that)
		session: session
	}),
	flash = require('connect-flash'), //express middleware for handling flash messages, must come after session-related requires
	config = require('./config'), //so it can use the globbing functions created in config.js
	consolidate = require('consolidate'), //wrapper for templates
	path = require('path'); //path manipulation library for NodeJS

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath)); //require every model, calling resolve to ensure paths are absolute
	});

	// Setting application local variables. 
	//All of the config.app variables are available because we get them from config.js when we called extend with the ENV files
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.facebookAppId = config.facebook.clientID;
	app.locals.jsFiles = config.getJavaScriptAssets(); //see config.js for glob function
	app.locals.cssFiles = config.getCSSAssets(); //see config.js for glob function

	// Passing the request url to environment locals
	// protocol and headers.host are express values given to the req arg. (name of req depends on how user names param)
	//This part basically tells us to use localhost://3000 (or whatever port we define in all.js)
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	if (process.env.NODE_ENV === 'secure') {
		// Log SSL usage
		console.log('Securely using https protocol');

		// Load SSL key and certificate
		var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
		var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	// Return Express server instance
	return app;
};