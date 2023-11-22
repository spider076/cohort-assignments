import { once, measure } from "helpful-decorators";


// ? this demonstrate the use decorators in typescript and also shows the differnce between the traditional way of knowing the time taken to 
// ? run an expensize operation vs knowing it with the use of Decorators the easiest way . 
class Decorators {
    private max: number;
    constructor(max: number) {
        this.max = max;
    }

// This code snippet demonstrates the use of decorators in TypeScript. It shows the difference between measuring the time taken to run an expensive operation using decorators and the traditional way. The code also includes an example of a one-time operation that will only run once.
    @once
    oneTimeOperation() {
        return "this will only run once";
    }

    @measure
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
        console.log('Total Time Token to run the expensive operation is ', end-start + "ms");
        return ctr;
    }

    
}

const instance = new Decorators(10101010);
const m = instance.expensiveOperation();
console.log('Expensive Operation ', m);