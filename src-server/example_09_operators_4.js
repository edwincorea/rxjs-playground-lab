import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

//reduce: produce a single value out of all items from a subscribed observable

// Rx.Observable.interval(1000)
//     .take(3)
//     .map(a => a * a)
//     .subscribe(createSubscriber("map"));

// const values = [342, 432, 23, 1, 4];
// const sum = arrayReduce(values, (acc, i) => acc + i, 0); //summatory
// console.log(sum);

// const max = arrayReduce(
//     values, 
//     (acc, value) => {
//         if(value > acc)
//             return value;
        
//         return acc;
//     }, 
//     -1); //max
// const max = arrayReduce(values, Math.max, -1);
// console.log(max);
 
// function arrayReduce(array, accumulator, startValue){
//     let value = startValue;
     
//     for (let item of array){
//         value = accumulator(value, item);
//     }        
     
//     return value;
// }

//Now we do with observables...
// Rx.Observable.range(1, 10)
//     .merge(Rx.Observable.never()) //what if we have a hot stream that needs values as soon as they come... use scan!
//     .reduce((acc, value) => acc + value)
//     .subscribe(createSubscriber("reduce"));
    
//Scan is similar to reduce but produce every single value. Process values as they come in, don't wait until previous stream finishes.
// Rx.Observable.range(1, 10)
//     .merge(Rx.Observable.never())
//     .scan((acc, value) => acc + value)
//     .subscribe(createSubscriber("scan"));

//Another example: get the first and last value
Rx.Observable.range(1, 10)
    .map(i => i * i)
    .scan(([last], current) => [current, last], []) //this scan function is simmilar to scanLast...    
    .subscribe(createSubscriber("scan"));
     
     
// function scanLast(acc, value){
//     const last = acc[0];
//     return [value, last];    
// }    

//*** Use reduce for cold observables that we know it will end at some point and don't need intermediate results. 
//*** Use scan for hot observables that you continually need eager values and process them.