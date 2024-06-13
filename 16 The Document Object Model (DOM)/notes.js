alert("Hello from external");

var heading = document.firstElementChild.lastElementChild.firstElementChild
// goes to html then body then h1

heading.innerHTML = "Changed";
heading.style.color = "red";

document.querySelector("input").click();
// clicks all inputs