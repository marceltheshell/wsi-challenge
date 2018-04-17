// npm packages

const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')

// new express app
const app = express()

// middleware
app.use(express.static(path.join(__dirname, 'public/views')))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

const PORT = process.env.PORT || 3000
// listening port
app.listen(PORT, function (e) {
  if (e) throw e
})


