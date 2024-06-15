var third = document.firstElementChild.lastElementChild.querySelector("ul").lastElementChild;

third.innerHTML = "Neirel Zapatos";

console.log(document.getElementsByTagName("li"));
// gets all li items in ul in an array

document.getElementsByTagName("li");
document.getElementsByTagName("li")[2].style.color = "purple";
// changes the third list item to purple
document.getElementsByTagName("li")[2].style.fontSize = "10rem";
document.getElementsByTagName("li")[2].style.padding = "30%";


console.log(document.getElementsByTagName("li").length); 
// gets length of array

console.log(document.getElementsByClassName("btn"));
// returns an array

console.log(document.getElementById("title"));
// gets element based of id

document.getElementById("title").innerHTML ="Dog";

document.querySelector("#title");
// gets title id
document.querySelector(".btn");
// gets button class
document.querySelector("h1");
// gets by element type
console.log(document.querySelector("li a"));
// combines selectors
console.log(document.querySelector("li.list"));
// combines selectors within the same element
console.log(document.querySelectorAll("li"));
// finds all list elements

document.querySelector(".btn").style.backgroundColor = "yellow";

//query selectors are more specific as a result is used more
//getters are more broad

document.querySelector(".btn").classList.add("invisible");
// adds invisble class to element that contains btn class
console.log(document.querySelector(".btn").classList);

document.querySelector(".btn").classList.remove("invisible");
// removes invisible class to the element that containts btn class

document.querySelector(".btn").classList.toggle("invisible");
// applies/removes invisible class to the element that contains the btn class

document.querySelector("h1").classList.add("huge");

document.querySelector("h1").textContent = "Cat";
// changes the text of the element

document.querySelector("h1").innerHTML = "<em>Car</em>";
// changes the literal html inside the element allowing to add html tags

console.log(document.querySelector("a").attributes);
// returns a how many href there are in an a element

console.log(document.querySelector("a").setAttribute("href", "https://www.bing.com"));
// sets the href attribute to the bing url


