let index = 1;
show(index);
var imgOne = document.getElementById("slide1");
var imgTwo = document.getElementById("slide2");
var imgThree = document.getElementById("slide3");
var imgFour = document.getElementById("slide4");
var imgFive = document.getElementById("slide5");
var imgSix = document.getElementById("slide6");
var editText = document.getElementById("editText");

function hovering(x) {
    editText.style.display = "block";
    editText.style.textAlign = "center";
    editText.innerHTML = "Click to Edit!";
}

function nonhover(x) {
    editText.style.display = "none";
}

// Next/previous controls
function plus(n) {
    show(index += n);
  }

function show(n) {
    let i;
    let slides = document.getElementsByClassName("slideshow");

    console.log(slides.length);
    
    if(n > slides.length) {
        index = 1;
    }

    if(n < 1) {
        index = slides.length;
    }

    for(i=0;i<slides.length;i++) {
        slides[i].style.display = "none";
    }

    slides[index-1].style.display = "block";
    console.log(index);
}