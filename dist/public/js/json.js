'use strict';

fetch('/wsiData', { method: 'GET' }).then(function (data) {
	return data.json();
}).then(function (json) {
	appendData(json);
}).catch(function (error) {
	return console.log(error);
});

var getPrice = function getPrice(jsonPrice) {
	var priceRange = jsonPrice["priceRange"];
	var price = jsonPrice["price"];
	var productPrice = null;

	if (priceRange === undefined) {
		productPrice = '$' + price["selling"];
	} else if (price === undefined) {
		var low = priceRange["selling"]["low"];
		var high = priceRange["selling"]["high"];
		productPrice = '$' + low + ' - $' + high;
	}
	return productPrice;
};

var serialize = function serialize(blob) {

	var response = {};
	var images = [];

	for (var i = 0; i < blob["images"].length; i++) {
		images.push(blob["images"][i]["href"]);
	}

	response["images"] = images;
	response["price"] = getPrice(blob);
	response["name"] = blob["name"];
	response["hero"] = blob["hero"]["href"];

	return response;
};

var appendCarouselIndicators = function appendCarouselIndicators(thumbnails) {
	var carouselIndicators = document.getElementById("carousel-indicators");
	carouselIndicators.innerHTML = "";

	for (var i = 0; i < thumbnails.length; i++) {

		//creating the indicator li
		var li = document.createElement("li");
		li.dataset.dataSlideTo = i.toString();
		li.dataset.target = "#carousel";

		// setting first element to active class
		if (i <= 0) {
			li.className = "active";
		}
		carouselIndicators.appendChild(li);
	}
};

var appendCarouselImgs = function appendCarouselImgs(thumbnails) {
	var element = document.getElementById("carousel-inner");
	element.innerHTML = "";

	for (var i = 0; i < thumbnails.length; i++) {
		var carouselItem = document.createElement("div");

		if (i <= 0) {
			carouselItem.className = "carousel-item active";
		} else {
			carouselItem.className = "carousel-item";
		}

		var img = document.createElement("img");
		img.className = "d-block w-100";
		img.src = thumbnails[i];
		carouselItem.appendChild(img);
		element.appendChild(carouselItem);
	}
};

var showCarousel = function showCarousel(imgThumbnails) {
	$('#myModal').modal('show');
	appendCarouselImgs(imgThumbnails);
	appendCarouselIndicators(imgThumbnails);
};

var appendData = function appendData(json) {
	var _loop = function _loop(i) {
		//serializing response
		var response = serialize(json["groups"][i]);

		// creating DOM variables
		var liNode = document.createElement("li");
		liNode.className = "list-inline-item col-xs-12 col-sm-4";

		var divOuter = document.createElement("div");
		divOuter.className = "card";

		var cardImgHeader = document.createElement("img");
		cardImgHeader.className = "card-img-top";
		cardImgHeader.src = response["hero"];
		cardImgHeader.addEventListener("click", function () {
			showCarousel(response["images"]);
		}, false);

		var cardBody = document.createElement("div");
		cardBody.className = "card-body";

		var cardName = document.createElement("p");
		cardName.className = "card-text";

		var cardPrice = document.createElement("p");
		cardPrice.className = "card-text font-bold";

		var nameNode = document.createTextNode(response["name"]);
		var priceNode = document.createTextNode(response["price"]);

		//appending DOM variables
		cardName.appendChild(nameNode);
		cardPrice.appendChild(priceNode);

		cardBody.appendChild(cardName);
		cardBody.appendChild(cardPrice);

		divOuter.appendChild(cardImgHeader);
		divOuter.appendChild(cardBody);

		liNode.appendChild(divOuter);

		document.getElementById("products").appendChild(liNode);
	};

	for (var i = 0; i < json["groups"].length; i++) {
		_loop(i);
	}
};