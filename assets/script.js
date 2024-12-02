/* -------------------------------------------------------------
 * Adjust starting font size depending on viewport width
 * Does not update if you change viewport width manually
 * ------------------------------------------------------------- */
/*
var fontSize = document.getElementsByClassName("sizeValue");
var viewport_width = window.innerWidth;

if ( viewport_width <= 720 ) {
	for ( let i = 0; i < fontSize.length; i++ ) {
        fontSize[i].innerHTML = "36 px"; 
    }
} else if ( viewport_width <= 1200) {
	for ( let i = 0; i < fontSize.length; i++ ) {
        fontSize[i].innerHTML = "72 px"; 
    }
} else {
	for ( let i = 0; i < fontSize.length; i++ ) {
        fontSize[i].innerHTML = "125 px"; 
    }
}


/* -------------------------------------------------------------
 * Change font size
 * ------------------------------------------------------------- */
var selectSize = document.getElementsByClassName("selectSize");
	
for ( let i = 0; i < selectSize.length; i++ ) {
    selectSize[i].addEventListener("input", function() { 
	        
        var chosenSize = selectSize[i].value;
        document.getElementsByClassName("string")[i].style.fontSize = chosenSize + "px";
        document.getElementsByClassName("sizeValue")[i].innerHTML = chosenSize + " px";
	        
    }, false);
}

/* -------------------------------------------------------------
 * Populate the text block from the buttons in the menu
 * ------------------------------------------------------------- */

// Read the JSON file
var content = content;

// Get the menu
var menu = '';
menu = document.getElementById("menu").getElementsByTagName("button");

// Fill text block with adhesion on page load
add_text(0);
menu[0].classList.add('current');

// Listen for button click of the menu
for ( let i = 0; i < menu.length; i++ ) {

    menu[i].addEventListener("click", function() {
        // Remove the class 'current' if it exists
		for (j = 0; j < menu.length; j++) {
		    menu[j].classList.remove('current')
		}		
		this.classList.add('current');
		add_text(i);
	}, false);
} 

function add_text(i) {
	var paragraph = document.getElementById("textbox");	
	paragraph_text = new Array();
	paragraph_text.push('<p class="string" contenteditable="true">');
	paragraph_text.push(content[i]['value']);
	paragraph_text.push('</p>');	
	paragraph.innerHTML = paragraph_text.join('');	
	
	// Reset type size 
    document.getElementsByClassName("string")[0].style.fontSize = "18px";
    document.getElementsByClassName("sizeValue")[0].innerHTML = "18 px";
    document.getElementsByClassName("selectSize")[0].value = "18";
}
