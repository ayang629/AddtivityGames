'use strict';
<<<<<<< HEAD

/**
 * Module dependencies.
 */
var _ = require('lodash'),
=======
//This module has some useful globbing functions that we'll use later
/**
 * Module dependencies.
 */
var _ = require('lodash'), //think of loadash as an awesome toolbelt that has a bunch of useful shorthands functions that are annoying to rewrite
>>>>>>> 59c6c424a2c0ed1cee3b4818ffbc3d19bbce45c7
	glob = require('glob');

/**
 * Load app configurations
 */
<<<<<<< HEAD
module.exports = _.extend(
=======
module.exports = _.extend(   //call to extend adds to the /env/process.env.NODE_ENV.js document everything in /env/all.js but does not replace shared object attributes
>>>>>>> 59c6c424a2c0ed1cee3b4818ffbc3d19bbce45c7
	require('./env/all'),
	require('./env/' + process.env.NODE_ENV) || {}
);

/**
 * Get files by glob patterns
 */
<<<<<<< HEAD
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
=======
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) { //function that outputs an array output of unique files that match the urlRegex form (ie: valid url path format)
>>>>>>> 59c6c424a2c0ed1cee3b4818ffbc3d19bbce45c7
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
<<<<<<< HEAD
	var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');
=======
	var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/'); //assets come from the env files
>>>>>>> 59c6c424a2c0ed1cee3b4818ffbc3d19bbce45c7

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
	return output;
};