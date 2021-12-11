var slideIndex = 0;
var numSlika = 3;
showSlides();

function showSlides() {
  var i;
  var slika = document.getElementById("slikaMenja");

  slideIndex++;

  if (slideIndex > numSlika){  
    slika.classList.remove("slika" + numSlika);   
        slideIndex = 1
    }  
 
    console.log(slideIndex);
  slika.classList.add("slika" + slideIndex);
  slika.classList.remove("slika" + (slideIndex-1));

  setTimeout(showSlides, 2000); 
}