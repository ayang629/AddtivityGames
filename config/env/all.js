'use strict';

module.exports = {
	app: {
		title: 'Vision-Bots',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
<<<<<<< HEAD
	port: process.env.PORT || 3000,
=======
	port: process.env.PORT || 3000, //port defined here
>>>>>>> 59c6c424a2c0ed1cee3b4818ffbc3d19bbce45c7
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
<<<<<<< HEAD
		lib: {
=======
		lib: { //add new external libraries here as well as putting them in the correct directory you list here (recommended public/lib)
>>>>>>> 59c6c424a2c0ed1cee3b4818ffbc3d19bbce45c7
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/slick-carousel/slick/slick.css',
				'public/lib/slick-carousel/slick/slick-theme.css',
				'public/lib/angular-ui-switch/angular-ui-switch.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/slick-carousel/slick/slick.js',
				'public/lib/angular-slick/dist/slick.js',
				'public/lib/angular-ui-switch/angular-ui-switch.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};