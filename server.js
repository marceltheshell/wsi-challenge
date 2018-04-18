// npm packages
const https = require('https');
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')


// for the get
require('es6-promise').polyfill();
require('isomorphic-fetch');

// new express app
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

///
let data = {}
fetch('https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(data) {
		console.log(data)
	});


app.get("/wsiData", function (req, res) {
	res.json(data);
})

