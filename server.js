// npm packages
const https = require('https');
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
require('es6-promise').polyfill();
require('isomorphic-fetch');
const url = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json'
const app = express()

// middleware
app.use(express.static(path.join(__dirname, 'public/views')))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

const PORT = process.env.PORT || 3000
// listening port
app.listen(PORT, (err) => {
  if (err) throw err
})

app.get("/wsiData", function (req, response) {
	let body = "";

	https.get(url, res => {
		res.setEncoding("utf8");
		res.on("data", data => {
			body += data;
		});
		res.on("end", () => {
			body = JSON.parse(body);
			response.status(200).json(body);
		});
	});
	
})

