import animals, {useAnimals} from "./data";

// console.log(animals);
// //destructoring
const [cat, dog] = animals;
// console.log(cat);

// // gets the elements of object cat
// const { name, sound } = cat;
// console.log(sound);

// // changes the variable names
// const { name: catName, sound: carSound } = cat;
// console.log(catSound);

// // if it doesnt have these variables then these values would be set to them
// const { name = "Fluffy", sound = "Purr"} = cat;

// // destructored a nesting object
// const { name, sound, feedingRequirements: { food, water} } = cat;
// console.log(food);

const [animal, makeSound] = useAnimals(cat);
console.log(animal);
makeSound();



// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom/client";
import cars from "./practice";

const [honda, tesla] = cars;
const { speedStats: { topSpeed: teslaTopSpeed }, coloursByPopularity: [teslaTopColour]} = tesla
const { speedStats: { topSpeed: hondaTopSpeed }, coloursByPopularity: [hondaTopColour]} = honda

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
