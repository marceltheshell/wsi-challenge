'use strict';

// npm packages
var https = require('https');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
require('es6-promise').polyfill();
require('isomorphic-fetch');
var url = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json';
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

app.get("/wsiData", function (req, response) {
	var body = "";

	https.get(url, function (res) {
		res.setEncoding("utf8");
		res.on("data", function (data) {
			body += data;
		});
		res.on("end", function () {
			body = JSON.parse(body);
			response.status(200).json(body);
		});
	});
});