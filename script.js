var pages = [
	["1st test", 5, 8],
	["2nd test", 16, 57],
	["3rd test", 3, 4],
	["Final test", 26, 42],
	["Results"]
];

var pb = ["NO", "NO"];

var rgb = 0;
var tb = 0;

function init() {
	selectImage(pages[0], true, -1);
}

function selectImage(page, first, override) {

	var imgId = page[1 + (override == -1 
	? Math.floor(Math.random() * (page.length - 1)) : override)];
	
	if (first) {
		byId("img_main").src = "images/" + imgId + ".jpg";
	}
	else {
	
		fade(byId("img_main"), "out");
		setTimeout(function() {	
			
			byId("img_main").src = "images/" + imgId + ".jpg";
			setTimeout(function() {
			
				fade(byId("img_main"), "in");
				
			}, 500);
		}, 500);
	}
}

function fade(btnElement, fading) {
	byId("img_main").className = "fade-" + fading;
}

function setPage(inc) {
	
	var current = pages.map(function(element) { return element[0]; })
	.indexOf(byId("header_title").innerHTML);
	
	var page = current + inc;
	
	byId("btn_back").style.visibility = (page === 0) ? "hidden" : "visible";
	byId("btn_next").style.visibility = (page === 4) ? "hidden" : "visible";
	
	byId("header_title").innerHTML = pages[page][0];
	
	if (inc > 0) {
		
		switch (current) {
			
			case 0:
				
				if (byId("img_main").src.indexOf("5.jpg") != -1) {
					
					if (byId("input").value == "2") {
						rgb++;
					}
					else if (byId("input").value != "5") {
						rgb++;
						tb++;
					}
				}
				else {
					
					if (byId("input").value == "3") {
						rgb++;
					}
					else if (byId("input").value != "8") {
						rgb++;
						tb++;
					}
				}
				
				break;
				
			case 1:
				
				if (byId("img_main").src.indexOf("16.jpg") != -1) {
					
					if (byId("input").value != "16") {
						rgb++;
						tb++;
					}
				}
				else {
					
					if (byId("input").value == "35") {
						
						rgb++;
					}
					else if (byId("input").value != "57") {
						
						rgb++;
						tb++;
					}
				}
				
				break;
				
			case 2:
			
				if (byId("img_main").src.indexOf("3.jpg") != -1) {
					
					if (byId("input").value != "3") {
						rgb++;
						tb++;
					}
				}
				else if ((byId("input").value == "4") || (byId("input").value == "5")) {
					
					rgb++;
				}
			
				break;
				
			case 3:
				
				if (byId("img_main").src.indexOf("26.jpg") != -1) {
					
					if (byId("input").value == "2") {
						pb[1] = "YES";
					}
					else if (byId("input").value == "6") {
						pb[0] = "YES";
					}
					else if (byId("input").value != "26") {
					
						pb = ["YES", "YES"];
						tb++;
					}
				}
				else {
					
					if (byId("input").value == "4") {
						pb[1] = "YES";
					}
					else if (byId("input").value == "2") {
						pb[0] = "YES";
					}
					else if (byId("input").value != "42") {
					
						pb = ["YES", "YES"];
						tb++;
					}
				}
				
				break;
		}
	}
	
	var imgs = pages[page];
	if (page == 2) {
		selectImage(imgs, false, 0 + (rgb > 0));
	}
	else if (page == 4) {
		
		byId("landingPage").style.visibility = "hidden";
		byId("input").style.display = "none";
		
		byId("table_main").style.display = "none";
		byId("result").style.display = "inline";
		
		byId("pt").innerHTML = tb.toString();
		byId("prg").innerHTML = rgb.toString();
		byId("pr").innerHTML = pb[0];
		byId("pg").innerHTML = pb[1];
	}
	else {
		selectImage(imgs, false, -1);
	}
	
	byId("input").value = "";
}

function send() {

	var url = "mailto:?subject=Dr.Color%20test%20results&body=" 
	+ "Probability%20of%20total%20color-blindness%3a%20" + byId("pt").innerHTML + "%2f3%0d%0a"
	+ "Probability%20of%20red-green-blindness%3a%20" + byId("prg").innerHTML + "%2f3%0d%0a%0d%0a"
	+ "Possibly%20red-blind%3a%20" + byId("pr").innerHTML + "%0d%0a"
	+ "Possibly%20green-blind%3a%20" + byId("pg").innerHTML + "%0d%0a";
	
	window.location.href = url;
}

function reset() {
	window.location.reload();
}

function byId(id) {
	return document.getElementById(id);
}