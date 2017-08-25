'use strict';

const fs        	= require('fs');
const path      	= require('path');
const _ 					= require('underscore');

module.exports = function(app, options) {
	let defaults = {
		dir: __dirname + '/../routes',
		path: '/api/'
	};

	options = options || {};
	_.extend(defaults, options);

  fs
    .readdirSync(defaults.dir)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
      if(file === 'index.js') return false;

      let route = require(defaults.dir + '/' + file);

      app.use(defaults.path + file.slice(0, -3), route);
    });
};
