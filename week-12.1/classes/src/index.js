"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpful_decorators_1 = require("helpful-decorators");
// ? this demonstrate the use decorators in typescript and also shows the differnce between the traditional way of knowing the time taken to 
// ? run an expensize operation vs knowing it with the use of Decorators the easiest way . 
class Decorators {
    constructor(max) {
        this.max = max;
    }
    // This code snippet demonstrates the use of decorators in TypeScript. It shows the difference between measuring the time taken to run an expensive operation using decorators and the traditional way. The code also includes an example of a one-time operation that will only run once.
    oneTimeOperation() {
        return "this will only run once";
    }
    expensiveOperationWithMeasureDecorator() {
        let ctr = 0;
        for (let i = 0; i < this.max; i++) {
            ctr++;
        }
        // console.log('Total Time Token to run the expensive operation is ', end-start + "ms");
        return ctr;
    }
    expensiveOperation() {
        let ctr = 0;
        const start = new Date().getTime();
        for (let i = 0; i < this.max; i++) {
            ctr++;
        }
        const end = new Date().getTime();
        console.log('Total Time Token to run the expensive operation is ', end - start + "ms");
        // return ctr;
    }
}
__decorate([
    helpful_decorators_1.once
], Decorators.prototype, "oneTimeOperation", null);
__decorate([
    helpful_decorators_1.measure
], Decorators.prototype, "expensiveOperationWithMeasureDecorator", null);
const instance = new Decorators(10101010);
const m = instance.expensiveOperation();
console.log('Expensive Operation ', m);
