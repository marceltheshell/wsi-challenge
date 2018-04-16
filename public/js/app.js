"use strict";

console.log("here")

const rootUrl = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json'

let products = []
let numberOfProducts = 0
let moreData = []

const fetchData = (url, callback) => {
  fetch(url, { method: 'GET' })
    .then(data => data.json())
    .then(json => {
      callback(json);
    })
    .catch((error) => handleError(error));
}

const handleError = (e) => {
  throw new Error(`There was an error fetching this data with error: ${e}`);
};

fetchData(rootUrl, json => {
  products = json.groups
  console.log(products)
  numberOfProducts = json.groups.length
})
