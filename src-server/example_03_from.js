import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util"

import fs from "fs";

//turn this into an observable...
/*
fs.readdir("./src-server", (err, items) => {
   if (err) console.error(err);
   else{
       console.log(items);       
   }    
});
*/

//bind node callback
/*
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);  
readdir$("./src-server")
    .mergeMap(files => Rx.Observable.from(files))
    .map(file => `Manipulated ${file}`)
    .subscribe(createSubscriber("readdir"));
*/


//turn a promise into an observable (reactive stream)...
function getItem(){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve("Hello!");
        }, 1000);        
    });
}

Rx.Observable.fromPromise(getItem())
    .subscribe(createSubscriber("promise"));
    
// 1. Using RxJS with DOM events: Rx.Observable.fromEvent
// 2. Using RxJS with Node functions: Rx.Observable.from
// 3. Using RxJS with Promises: Rx.Observable.fromPromise