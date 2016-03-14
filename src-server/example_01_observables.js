import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util"

//**********************Part 0
/*
Promises are eager. they get fired even if not called (promise.then(...))
Observables are in contrast lazy. The generator function is not run until there is  a subscription.

const promise = new Promise( (resolve, reject) => {
   resolve("hey"); 
});

promise.then(item => console.log(item));
*/

/*
An observable is a generator function which accepts an observer as parameter and invokes: next() and complete() methods on it.
Everytime we subscribe to the observable, the generator function gets run again.   
*/

//**********************Part 1
// Observables have similar syntax to promises. They take a function that receives an object as parameter
// We do pass a generator function observer => ...
/*
const simple$ = new Rx.Observable(observer => {
    console.log("Generating observable");
    setTimeout(() => {
        observer.next("An item!");
        setTimeout(() => {
            observer.next("Another item!");
            observer.complete();                        
        }, 1000);                   
    }, 1000);    
});

const error$ =  new Rx.Observable(observer => {
    observer.error(new Error("Oops!"));
});
*/

//A subscription is the part that actually does something with the data 

//First way to create subscription. Pass three functions:
// The first function maps to whatever next() does. OnNext callback.
// The second function maps to error(). OnError callback.
// The third function maps to complete(). OnComplete callback.
/*
simple$.subscribe(
    item => console.log(`one.next ${item}`),    //next()
    error => console.log(`one.error ${error.stack}`), //error()
    () => console.log("one.complete"));         //complete()

error$.subscribe(
    item => console.log(`error.next ${item}`),
    error => console.log(`error.error ${error.stack}`), 
    () => console.log("error.complete")); 
    
setTimeout(() => {
    simple$.subscribe({
        next: item => console.log(`two.next ${item}`),
        error(error){
            console.log(`two.error ${error}`);
        }, 
        complete: function() {
            console.log("two.complete")
        }       
    });
}, 3000);
*/

//**********************Part 2
/*
//moved to lib
function createSubscriber(tag){
    return {
        next(item) { console.log(`${tag}.next ${item}`); },
        error(error) { console.log(`${tag}.error ${error.stack || error}`); },
        complete() { console.log(`${tag}.complete`); }        
    }; 
}
*/

function createInterval$(time){
    return new Rx.Observable(observer => {
        let index = 0;
        let interval = setInterval(() => {
            console.log(`Generating ${index}`);
            observer.next(index++);
        }, time);
        
        return () => {
            clearInterval(interval);            
        };
    });        
}

//Custom observable operator: wrapper around observable
function take$(sourceObservable$, amount){
    //wrapping source observable into a base obervable. 
    //When source observable gets subscribed, it's subscribed to a base observable    
    return new Rx.Observable(observer => {
        let count = 0;
        const subscription = sourceObservable$.subscribe({
            next(item) {
                observer.next(item);
                if(++count >= amount)
                    observer.complete();                
            },
            error(error) { observer.error(error); },
            complete() { observer.complete(); }
        });        
        
        return subscription.unsubscribe();
    });
}

const everySecond$ = createInterval$(1000);
//const subscription = everySecond$.subscribe(createSubscriber("one"));
/*
setTimeout(() => {
    subscription.unsubscribe();
}, 3500);
*/

//const subscription = everySecond$.take(3).subscribe(createSubscriber("one"));

const firstFiveSeconds$ = take$(everySecond$, 5);
const subscription = firstFiveSeconds$.subscribe(createSubscriber("one")); 


