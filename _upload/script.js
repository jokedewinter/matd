/*
 * Drag and drop file upload
 * with help from ChatGPT
 * ******************************* */
 
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

    const files = event.dataTransfer.files; // Get the list of dropped files
    if (files.length === 0) {
        alert("No files dropped.");
        return;
    }
	
	handlefiles(files);
});

function handlefiles(files) {
	
    const fontFile = files[0]; // Assume the first file is the font file
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
        document.head.appendChild(styleElement); // Append the style to the document head
    };

    // Read the font file as a Data URL (works for fonts like .woff, .woff2, .ttf, .otf)
    fileReader.readAsDataURL(fontFile);

}

