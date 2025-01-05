/* -------------------------------------------------------------
 * Drag and drop file upload
 * Also works with the button to select files from system
 * (all with help from ChatGPT)
 * ------------------------------------------------------------- */
 
// Get the dropzone element
const dropzone = document.getElementById("dropzone");

// Add event listeners for drag, leave and drop
dropzone.addEventListener("dragover", (event) => {
    event.preventDefault(); 
    dropzone.classList.add('highlight'); 
});

dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove('highlight'); 
});

dropzone.addEventListener("drop", (event) => {
    event.preventDefault(); 
    dropzone.classList.remove('highlight'); 
    dropzone.classList.add('dropped'); 

	// Get the list of dropped files
    const files = event.dataTransfer.files; 
    if (files.length === 0) {
        alert("No files dropped.");
        return;
    }
	
	handlefiles(files);
});

function handlefiles(files) {
	
    // Assume the first file is the font file
	const fontFile = files[0]; 
    const fileReader = new FileReader();	

// Read the font file as a data URL
    fileReader.onload = function(e) {
        const fontDataUrl = e.target.result;

        // Create a new style element to define the @font-face rule
        const styleElement = document.createElement("style");
        styleElement.innerHTML = `
            @font-face {
                font-family: "ProofingFont";
                src: url("${fontDataUrl}") format("woff2");
            }
        `;
        // Append the style to the document head
		document.head.appendChild(styleElement); 
    };
	
	// Add filename of dropped file in the dropzone
	console.log(fontFile);
	var current = document.getElementById("current");
	current.innerHTML = fontFile.name;

    // Read the font file as a Data URL (works for fonts like .woff, .woff2, .ttf, .otf)
    fileReader.readAsDataURL(fontFile);

}


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
    document.getElementsByClassName("string")[0].style.fontSize = "24px";
    document.getElementsByClassName("size_value")[0].innerHTML = "24 px";
    document.getElementsByClassName("size_select")[0].value = "24";
}
