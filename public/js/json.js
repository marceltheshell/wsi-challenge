
fetch('/wsiData', { method: 'GET' })
    .then(data =>  data.json())
    .then(json => {
      appendData(json)
    })
    .catch((error) => console.log(error));

let getPrice = (jsonPrice) => {
	let priceRange = jsonPrice["priceRange"];
	let price = jsonPrice["price"];
	let productPrice = null;
	
	if (priceRange === undefined) {
		productPrice = `$ ${price["selling"]}`;

	} else if (price === undefined) {
		const low = priceRange["selling"]["low"];
		const high = priceRange["selling"]["high"];
		productPrice = `$ ${low} - $ ${high}` 
	}
	return productPrice;
};


let serialize = (blob) => {
	
	let response = {};
	let images = [];

	for (let i = 0; i < blob["images"].length; i++) {
		images.push(blob["images"][i]["href"]);
	}

	response["images"] = images;
	response["price"] = getPrice(blob);
	response["name"] = blob["name"].toUpperCase();
	response["hero"] = blob["hero"]["href"];

	return response;
};

let appendCarouselIndicators = (thumbnails) => {
	const carouselIndicators = document.getElementById("carousel-indicators");
	carouselIndicators.innerHTML = "";

	for (let i = 0; i < thumbnails.length; i++) {
		
		//creating the indicator li
		const li = document.createElement("li");
		li.dataset.dataSlideTo = i.toString();
		li.dataset.target = "#carousel";
		
		// setting first element to active class
		if (i <= 0) {
			li.className = "active";
		} 
		carouselIndicators.appendChild(li);
	}
};

let appendCarouselImgs = (thumbnails) => {
	const element = document.getElementById("carousel-inner");
	element.innerHTML = "";

	for (let i = 0; i < thumbnails.length; i++) {
		const carouselItem = document.createElement("div");

		if (i <= 0) {
			carouselItem.className = "carousel-item active";
		} else {
			carouselItem.className = "carousel-item";
		}

		const img = document.createElement("img");
		img.className = "d-block w-100";
		img.src = thumbnails[i];
		carouselItem.appendChild(img);
		element.appendChild(carouselItem);
	}
};

let showCarousel = (imgThumbnails) => {
	$('#myModal').modal('show')
	appendCarouselImgs(imgThumbnails);
	appendCarouselIndicators(imgThumbnails)
};

let appendData = (json) => {

	for (let i = 0; i < json["groups"].length; i++) {
		//serializing response
		const response = serialize(json["groups"][i])

		// creating DOM variables
		const liNode = document.createElement("li");
		liNode.className = "list-inline-item col-xs-12 col-sm-4 li-item";

		const divOuter = document.createElement("div");
		divOuter.className = "outer";

		const img = document.createElement("img");
		img.className = "img";
		img.src = response["hero"];
		img.addEventListener("click", function() { showCarousel(response["images"]) }, false);

	 	const cardName = document.createElement("div");
	 	cardName.className = "card-text container";

	 	const cardPrice = document.createElement("div");
	 	cardPrice.className = "card-price";

	 	const nameNode = document.createTextNode(response["name"]);
	 	const priceNode = document.createTextNode(response["price"]);

		//appending DOM variables
		cardName.appendChild(nameNode);
		cardPrice.appendChild(priceNode);
		divOuter.appendChild(cardName)
		divOuter.appendChild(cardPrice)
		divOuter.appendChild(img);
		liNode.appendChild(divOuter);

		document.getElementById("products").appendChild(liNode);
	}
};
