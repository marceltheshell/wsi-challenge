'use strict';

// npm packages
var https = require('https');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');

// for the get
require('es6-promise').polyfill();
require('isomorphic-fetch');

// new express app
var app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public/views')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var PORT = process.env.PORT || 3000;
// listening port
app.listen(PORT, function (err) {
	if (err) throw err;
});

///
var data = {};
fetch('https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json').then(function (response) {
	if (response.status >= 400) {
		throw new Error("Bad response from server");
	}
	return response.json();
}).then(function (data) {
	console.log(data);
});

app.get("/wsiData", function (req, res) {
	res.json(data);
});