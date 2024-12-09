/* -------------------------------------------------------------
 * Change font size
 * ------------------------------------------------------------- */
var selectSize = document.getElementsByClassName("size_select");
	
for ( let i = 0; i < selectSize.length; i++ ) {
    selectSize[i].addEventListener("input", function() { 
	        
        var chosenSize = selectSize[i].value;
        document.getElementsByClassName("string")[i].style.fontSize = chosenSize + "px";
        document.getElementsByClassName("size_value")[i].innerHTML = chosenSize + " px";
	        
    }, false);
}

/* -------------------------------------------------------------
 * Choose theme
 * ------------------------------------------------------------- */

var reverse = document.getElementById("reverse");
var container = document.body;
reverse.onclick = function() { 
   container.classList.toggle("dark-mode");
}

/* -------------------------------------------------------------
 * Populate the text block from the buttons in the menu
 * ------------------------------------------------------------- */

// Read the JSON file
var content = content;

// Get the menu
var menu = '';
menu = document.getElementById("menu").getElementsByClassName("text_choice");

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
	
	var language = '';
	if ( 'arabic' == content[i]['text'] ) { language = "style='direction:rtl;'"; }
	paragraph_text.push('<p class="string" contenteditable="true" ' + language + ' >');
	paragraph_text.push(content[i]['value']);
	paragraph_text.push('</p>');	
	paragraph.innerHTML = paragraph_text.join('');	
	
	// Reset type size 
    document.getElementsByClassName("string")[0].style.fontSize = "18px";
    document.getElementsByClassName("size_value")[0].innerHTML = "18 px";
    document.getElementsByClassName("size_select")[0].value = "18";
}
