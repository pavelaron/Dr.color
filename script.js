var pages = ["1st test", "2nd test", "3rd test", "Final test", "Results"];
var images = [[5, 8], [16, 57], [3, 4], [26, 42]];

var rgb = [0, 0, 0, 0];
var tb = [0, 0, 0, 0];
var pb = ["NO", "NO"];

function init() {

	selectImage(1, 5, 8, true);
}

function selectImage(page, value1, value2, first) {

	var imgId = (Math.random() > 0.5) ? value1 : value2;
	
	if (first) {
		byId("img_main").src = "images/" + page + imgId + ".jpg";
	}
	else {
	
		fade(byId("img_main"), false);
		setTimeout(function() {	
			
			byId("img_main").src = "images/" + page + imgId + ".jpg";
			setTimeout(function() {
			
				fade(byId("img_main"), true);
				
			}, 500);
		}, 500);
	}
}

function fade(btnElement, fadeIn) {

	document.getElementById("img_main").className = fadeIn ? "fade-in" : "fade-out";
}

function setPage(inc) {
	
	var current = pages.indexOf(byId("header_title").innerHTML);
	var page = current + inc;
	
	byId("btn_back").style.visibility = (page == 0) ? "hidden" : "visible";
	byId("btn_next").style.visibility = (page == 4) ? "hidden" : "visible";
	
	byId("header_title").innerHTML = pages[page];
	
	if (inc > 0) {
		
		switch (current) {
			
			case 0:
				
				rgb[0] = 0;
				tb[0] = 0;
				
				if (byId("img_main").src.indexOf("15.jpg") != -1) {
					
					if (byId("input").value == "2") {
						rgb[0] = 1;
					}
					else if (byId("input").value != "5") {
						rgb[0] = 1;
						tb[0] = 1;
					}
				}
				else {
					
					if (byId("input").value == "3") {
						rgb[0] = 1;
					}
					else if (byId("input").value != "8") {
						rgb[0] = 1;
						tb[0] = 1;
					}
				}
				
				break;
				
			case 1:
				
				rgb[1] = 0;
				tb[1] = 0;
				
				if (byId("img_main").src.indexOf("216.jpg") != -1) {
					
					if (byId("input").value != "16") {
						rgb[1] = 1;
						tb[1] = 1;
					}
				}
				else {
					
					if (byId("input").value == "35") {
						
						rgb[1] = 1;
						tb[1] = 0;
					}
					else if (byId("input").value != "57") {
						
						rgb[1] = 1;
						tb[1] = 1;
					}
				}
				
				break;
				
			case 2:
			
				rgb[2] = 0;
				tb[2] = 0;
				
				if (byId("img_main").src.indexOf("33.jpg") != -1) {
					
					if (byId("input").value != "3") {
						rgb[2] = 1;
						tb[2] = 1;
					}
				}
				else if ((byId("input").value == "4") || (byId("input").value == "5")) {
					
					rgb[2] = 1;
					tb[2] = 0;
				}
			
				break;
				
			case 3:
				
				rgb[3] = 0;
				tb[3] = 0;
				
				if (byId("img_main").src.indexOf("426.jpg") != -1) {
					
					if (byId("input").value == "2") {
						pb[1] = "YES";
					}
					else if (byId("input").value == "6") {
						pb[0] = "YES";
					}
					else if (byId("input").value != "26") {
					
						pb = ["YES", "YES"];
						tb[3] = 1;
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
						tb[3] = 1;
					}
				}
				
				break;
		}
	}
	
	var imgs = images[page];
	if (page == 2) {
		
		fade(byId("img_main"), false);
		setTimeout(function() {	
		
			byId("img_main").src = (rgb[0] + rgb[1] > 0) ? "images/34.jpg" : "images/33.jpg";
			setTimeout(function() {
			
				fade(byId("img_main"), true);
			
			}, 500);
		}, 500);
	}
	else if (page == 4) {
		
		byId("landingPage").style.visibility = "hidden";
		byId("input").style.display = "none";
		
		byId("table_main").style.display = "none";
		byId("result").style.display = "inline";
		
		var irgb = 0;
		var itb = 0;
		
		for (var i = 0; i < rgb.length; i++) {
			
			irgb += rgb[i];
			itb += tb[i];
		}
		
		byId("pt").innerHTML = itb.toString();
		byId("prg").innerHTML = irgb.toString();
		byId("pr").innerHTML = pb[0];
		byId("pg").innerHTML = pb[1];
	}
	else {
		selectImage(page + 1, imgs[0], imgs[1], false);
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