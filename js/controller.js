/*****************************************************************************
*                                   SEARCH                                   *
*****************************************************************************/

function Search(text) {
	if (text) {
		window.location.replace("https://www.yourcoca-cola.co.uk/elysium.search?search=" + text);
	}
}

/*****************************************************************************
*                                POINTS MODE                                 *
*****************************************************************************/

// 0: triangles, 1: points, 2: lines
function SetPointsMode(pointsMode) {
	let models = document.getElementsByTagName("x3d");

	for (let i = 0; i < models.length; i++) {
		models[i].runtime.canvas.doc._viewarea._points = pointsMode;
	}
}

/*****************************************************************************
*                                  VIEWPORT                                  *
*****************************************************************************/

function SetViewport(position, orientation) {
	let viewports = document.getElementsByTagName("Viewpoint");

	for (let i = 0; i < viewports.length; i++) {
		viewports[i].position = position;
		viewports[i].orientation = orientation;
	}
}

function SetViewportFront() {
	SetViewport("0 0 3", "0 0 0 0");
}

function SetViewportBack() {
	SetViewport("0 0 -3", "0 1 0 3.141592");
}

function SetViewportLeft() {
	SetViewport("-3 0 0", "0 -1 0 1.570796");
}

function SetViewportRight() {
	SetViewport("3 0 0", "0 1 0 1.570796");
}

function SetViewportTop() {
	SetViewport("0 3 0", "-1 0 0 1.570796");
}

function SetViewportBottom() {
	SetViewport("0 -3 0", "1 0 0 1.570796");
}

/*****************************************************************************
 *                                 ROTATION                                  *
 ****************************************************************************/

function SetRotation(keyValue) {
	let rotator = document.getElementById('Rotator');

	if (rotator != null) {
		rotator.keyValue = keyValue;
	}
}

function SetRotationX() {
	SetRotation("1 0 0 0 1 0 0 1.57079 1 0 0 3.14159  1 0 0 4.71239  1 0 0 6.28317");
}

function SetRotationY() {
	SetRotation("0 1 0 0 0 1 0 1.57079 0 1 0 3.14159  0 1 0 4.71239  0 1 0 6.28317");
}

function SetRotationZ() {
	SetRotation("0 0 1 0 0 0 1 1.57079 0 0 1 3.14159  0 0 1 4.71239  0 0 1 6.28317");
}

function SetRotationOff() {
	SetRotation("0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0");
}

/*****************************************************************************
*                             BRANDS AND MODELS                              *
*****************************************************************************/

let _brand = 0; // 0: coca cola, 1: coca cola zero sugar, 2: diet coke
let _model = 0; // 0: bottle, 1: can

const BRAND_MIN = 0;
const BRAND_MAX = 2;

const BRAND_COCA_COLA = 0;
const BRAND_COCA_COLA_ZERO_SUGAR = 1;
const BRAND_DIET_COKE = 2;

// 0: coca cola, 1: coca cola zero sugar, 2: diet coke
function SetBrand(brand) {
	console.log(`SetBrand(${brand})`);

	if (brand >= 0 && brand <= BRAND_MAX) {
		_brand = brand;

		SetVisibleModel();
		UpdateBrand();
		UpdateGallery();
	}
}

function UpdateBrand() {
	document.getElementById("title").textContent = "Loading...";
	document.getElementById("description").textContent = "Loading...";

	let url = "https://users.sussex.ac.uk/~jl2011/3dapp/assignment/php/database.php?brand=" + _brand;

	$.getJSON(url)
		.done((json) => {
			document.getElementById("title").textContent = json["title"];
			document.getElementById("description").textContent = json["description"];
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.error(textStatus);
		});
}

const MODEL_MIN = 0;
const MODEL_MAX = 1;

const MODEL_BOTTLE = 0;
const MODEL_CAN = 1;

// 0: bottle, 1: can
function SetModel(model) {
	console.log(`SetModel(${model})`);

	if (model >= 0 && model <= MODEL_MAX) {
		_model = model;

		SetVisibleModel();
		UpdateGallery();
	}
}

function SetVisibleModel() {
	switch (_model) {
		case MODEL_BOTTLE:
			switch (_brand) {
				case BRAND_COCA_COLA: SetVisibleNode(0); break;
				case BRAND_COCA_COLA_ZERO_SUGAR: SetVisibleNode(1); break;
				case BRAND_DIET_COKE: SetVisibleNode(2); break;
			}
			break;

		case MODEL_CAN:
			switch (_brand) {
				case BRAND_COCA_COLA: SetVisibleNode(3); break;
				case BRAND_COCA_COLA_ZERO_SUGAR: SetVisibleNode(4); break;
				case BRAND_DIET_COKE: SetVisibleNode(5); break;
			}
			break;

		default:
			return;
	}
}

function SetVisibleNode(nodeId) {
	document.getElementById("switcher").setAttribute("whichChoice", nodeId);
}

/*****************************************************************************
*                                  GALLERY                                   *
*****************************************************************************/

function UpdateGallery() {
	let url = "https://users.sussex.ac.uk/~jl2011/3dapp/assignment/php/gallery.php?brand=" + _brand + "&model=" + _model;

	$.getJSON(url)
		.done((json) => {

			console.log(json.length);

			let html = "";

			for (let index = 0; index < json.length; index++) {
				html += `<div class="col-sm-4">`;
				html += `<img class="w-100" src=\"images/${json[index]["filename"]}"/>`;
				html += `</div>`;
			}

			console.log(html);

			$("#gallery").html(html);

		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.error(textStatus);
		});
}

/*****************************************************************************
*                                 NAVIGATION                                 *
*****************************************************************************/

$(document).ready(() => {
	$("#container-home").show();
	$("#container-journal").hide();
	$("#container-museum").hide();

	$("#navbar-home").addClass('active');
	$("#navbar-journal").removeClass('active');
	$("#navbar-museum").removeClass('active');

	UpdateBrand();
	UpdateGallery();
});

function ShowHome() {
	$("#container-home").show();
	$("#container-journal").hide();
	$("#container-museum").hide();

	$("#navbar-home").addClass('active');
	$("#navbar-journal").removeClass('active');
	$("#navbar-museum").removeClass('active');
}

function ShowJournal() {
	$("#container-home").hide();
	$("#container-journal").show();
	$("#container-museum").hide();

	$("#navbar-home").removeClass('active');
	$("#navbar-journal").addClass('active');
	$("#navbar-museum").removeClass('active');
}

function ShowMuseum(brand, model) {
	SetBrand(brand);
	SetModel(model);

	$("#selection-brand > *.active").removeClass("active");
	$(`#selection-brand > *:nth-child(${_brand + 1})`).addClass("active");

	$("#selection-model > *.active").removeClass("active");
	$(`#selection-model > *:nth-child(${_model + 1})`).addClass("active");

	$("#container-home").hide();
	$("#container-journal").hide();
	$("#container-museum").show();

	$("#navbar-home").removeClass('active');
	$("#navbar-journal").removeClass('active');
	$("#navbar-museum").addClass('active');
}