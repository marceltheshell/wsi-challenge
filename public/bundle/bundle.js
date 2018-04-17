(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
