import { Car } from "./car.js";

let data = document.querySelector("#data");
const name = "John Doe";

data.innerHTML = `
    <h2>JavaScript Learning Resources</h2>
    <h3>Hello ${name}!</h3>
`;

const names = ["Alice", "Bob", "Charlie", "Diana"];
names.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    data.appendChild(li);
});

let car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    start: function() {
        console.log("Car started");
    },
    stop: function() {
        console.log("Car stopped");
    },
    showDetails: function() {
        console.log(`Car Details: ${this.brand} ${this.model}, Year: ${this.year}`);
    }
};
car.start();
car.stop();
car.showDetails();

const greet = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello, welcome to JavaScript learning!");
    }, 2000);
});

greet.then((message) => {
    console.log(message);
    data.innerHTML += `<p>${message}</p>`;
})
.catch((error) => {
    console.error("Error:", error);
});

let car2 = new Car("Honda", "Civic", 2021);
car2.start();
car2.stop();
car2.showDetails();