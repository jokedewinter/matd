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
var chooseSize = document.getElementById("choose_size");
var selectSize = document.getElementsByClassName("size_select");
chooseSize.classList.toggle("hide");

for ( let i = 0; i < selectSize.length; i++ ) {
    selectSize[i].addEventListener("input", function() { 
	        
        var chosenSize = selectSize[i].value;
        document.getElementsByClassName("text")[i].style.fontSize = chosenSize + "px";
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

// Global variables
const sizes_big = [144, 96, 72, 48, 36, 24];
const sizes_small = [21, 18, 16, 14, 12, 10];

// Fill text block with adhesion on page load
//add_text(0);
//menu[0].classList.add('current');

// Get the choice of text
var menu_text = '';
menu_text = document.getElementById("menu_text").getElementsByClassName("choice_text");

for ( let i = 0; i < menu_text.length; i++ ) {

    menu_text[i].addEventListener("click", function() {
        // Remove the class 'current' if it exists
		for (j = 0; j < menu_text.length; j++) {
		    menu_text[j].classList.remove('current')
		}
		// Add current class to active selection
		this.classList.add('current');
		
		var proof = document.getElementById("proof");	
		proof_text = new Array();
		
		//console.log(i, menu_text[i].name);
		/*
		if (( "adhesion" == menu_text[i].name ) || ( "pangram" == menu_text[i].name )) { add_lines(i, proof_text); }
		if ( "layout" == menu_text[i].name ) { add_layout(i, proof_text); }
		if ( "glyphs" == menu_text[i].name ) { add_glyphs(i, proof_text); }
		else { add_blocks(i, proof_text); }
		*/
		
		switch ( menu_text[i].name ) {
			case "adhesion"  : chooseSize.classList.add("hide"); add_lines(0, proof_text); add_blocks(0, proof_text); break;
			case "pangram"   : chooseSize.classList.add("hide"); add_lines(1, proof_text); add_blocks(1, proof_text); break;
			case "lowercase" : check_size_toggle(chooseSize); add_single_block(2, proof_text); break;
			case "uppercase" : check_size_toggle(chooseSize); add_single_block(3, proof_text); break;
			case "paragraph" : check_size_toggle(chooseSize); add_single_block(4, proof_text); break;
			case "layout"	 : chooseSize.classList.add("hide"); add_layout(5, proof_text); break;
			case "glyphs"	 : chooseSize.classList.add("hide"); add_glyphs(6, proof_text); break;
			case "diacritics": chooseSize.classList.add("hide"); add_glyphs(7, proof_text); break;
//			case "kern": add_text(i); break;
			default :
				console.log('You broke it!');
		}		
		
		proof.innerHTML = proof_text.join('');		
		
	}, false);
} 

function check_size_toggle(chooseSize) {
	if (chooseSize.classList.contains("hide")) {
		chooseSize.classList.remove("hide");
	}
}


function add_lines(i, proof_text) {
	// Text single lines
	for ( let j = 0; j < sizes_big.length; j++ ) {
	
		proof_text.push('<h4>' + sizes_big[j] + 'px</h4>');
		proof_text.push('<p class="string" contenteditable="true" style="font-size: ' + sizes_big[j] + 'px;">');
		proof_text.push(content[i]['short']);
		proof_text.push('</p>');	
	}
	
	return proof_text;
}


function add_blocks(i, proof_text) {
	// Text blocks
	for ( let j = 0; j < sizes_small.length; j++ ) {
	
		proof_text.push('<article class="text width_' + sizes_small[j] + '">');
		proof_text.push('<h4>' + sizes_small[j] + 'px</h4>');
		proof_text.push('<p contenteditable="true" style="font-size: ' + sizes_small[j] + 'px;">');
		proof_text.push(content[i]['long']);
		proof_text.push('</p>');	
		proof_text.push('</article>');
	}
	
	return proof_text;
}


function add_single_block(i, proof_text) {	
	// Text block
	proof_text.push('<p class="text" contenteditable="true" style="font-size: 18px;">');
	proof_text.push(content[i]['long']);
	proof_text.push('</p>');	
	
	return proof_text;
}


function add_layout(i, proof_text) {
	// Layout blocks
	proof_text.push('<article class="layout">');
	proof_text.push('<h4>60px | 24px | 18px</h4>');
	proof_text.push('<p contenteditable="true" style="font-size: 60px;">');
	proof_text.push(content[i]['headline']);
	proof_text.push('</p>');	
	proof_text.push('<p contenteditable="true" style="font-size: 24px;">');
	proof_text.push(content[i]['intro']);
	proof_text.push('</p>');	
	proof_text.push('<p contenteditable="true" style="font-size: 18px;">');
	proof_text.push(content[i]['paragraphs']);
	proof_text.push('</p>');	
	proof_text.push('</article>');
	
	return proof_text;
}


function add_glyphs(i, proof_text) {
	// Layout blocks
	proof_text.push('<article class="glyphs">');
	proof_text.push('<h4>72px</h4>');
	proof_text.push('<p contenteditable="true" style="font-size: 72px;">');
	proof_text.push(content[i]['lowercase']);
	proof_text.push('</p>');

	if ( "" != content[i]['uppercase'] ) {
		proof_text.push('<p contenteditable="true" style="font-size: 72px;">');
		proof_text.push(content[i]['uppercase']);
		proof_text.push('</p>');	
	}
	
	if ( "" != content[i]['figures'] ) {
	proof_text.push('<p contenteditable="true" style="font-size: 72px;">');
	proof_text.push(content[i]['figures']);
	proof_text.push('</p>');	
	}
	
	if ( "" != content[i]['punctuation'] ) {
	proof_text.push('<p contenteditable="true" style="font-size: 72px;">');
	proof_text.push(content[i]['punctuation']);
	proof_text.push('</p>');	
	}
	
	proof_text.push('</article>');
	
	return proof_text;
}

