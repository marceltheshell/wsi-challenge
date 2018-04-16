"use strict";

console.log("here");

var rootUrl = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json';

var products = [];
var numberOfProducts = 0;
var moreData = [];

var fetchData = function fetchData(url, callback) {
  fetch(url, { method: 'GET' }).then(function (data) {
    return data.json();
  }).then(function (json) {
    callback(json);
  }).catch(function (error) {
    return handleError(error);
  });
};

var handleError = function handleError(e) {
  throw new Error("There was an error fetching this data with error: " + e);
};

fetchData(rootUrl, function (json) {
  products = json.groups;
  console.log(products);
  numberOfProducts = json.groups.length;
});