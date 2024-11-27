/* -------------------------------------------------------------
 * Choose size
 * ------------------------------------------------------------- */
var selectSize = document.getElementsByClassName("selectSize");
	
for ( let i = 0; i < selectSize.length; i++ ) {
    selectSize[i].addEventListener("input", function() { 
	        
        var chosenSize = selectSize[i].value;
        document.getElementsByClassName("string")[i].style.fontSize = chosenSize + "px";
        document.getElementsByClassName("sizeValue")[i].innerHTML = chosenSize + " px";
	        
    }, false);
}
