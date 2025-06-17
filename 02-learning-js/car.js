export class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    start() {
        console.log("[class] Car started");
    }

    stop() {
        console.log("[class] Car stopped");
    }

    showDetails() {
        console.log(`[class] Car Details: ${this.brand} ${this.model}, Year: ${this.year}`);
    }
}