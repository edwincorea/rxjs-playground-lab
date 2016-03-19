import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

// Rx.Observable.concat(
//     Rx.Observable.of(42),
//     Rx.Observable.throw(new Error("Failed!!!")),
//     Rx.Observable.of(10))
//     .subscribe(createSubscriber("catch"));
    
//We don't get 10. How do we fix this?
/*
catch.next 42
catch.error Error: Failed!!!
*/    

// Rx.Observable.fromPromise(getApi())
//     .do(() => console.log("Thing")) //this won't print because an error was thrown and the observable subscription is finished
//     .subscribe(createSubscriber("api"));

// function getApi(){
//     console.log("Getting API");
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             //resolve("Hello");
//             reject(new Error("Failed!!!"));            
//         }, 1000); 
//     });
// }

// Rx.Observable.fromPromise(getApi())
//     .catch(error => Rx.Observable.of(error)) //it wraps an error into an item
//     .do(() => console.log("Thing")) //this won't print because an error was thrown and the observable subscription is finished
//     .subscribe(createSubscriber("api"));

// function getApi(){
//     console.log("Getting API");
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             //resolve("Hello");
//             reject(new Error("Failed!!!"));            
//         }, 1000); 
//     });
// }

getApi()
    .retry(3)//how about retrying 3 times? It restarts the workflow if an error is thrown...
    .catch(error => Rx.Observable.of(error)) //it wraps an error into an item
    .do(() => console.log("Thing")) //this won't print because an error was thrown and the observable subscription is finished
    .subscribe(createSubscriber("api"));

function getApi(){    
    return new Rx.Observable(observer => {
        console.log("Getting API");
        setTimeout(() => {
            //observer.next("Hei!!!");
            //observer.complete();
            observer.error(new Error("Hell!!!"));
        }, 1000);
        
    });
}


/*
Getting API
Thing
api.next Error: Failed!!!
api.complete
*/