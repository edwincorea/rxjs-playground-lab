import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

//buffer middleware. Buffering items into arrays of count size 
// Rx.Observable.range(1, 100)
//     .bufferCount(25)
//     .subscribe(createSubscriber("bufferCount"));

//admits an array of items every n miliseconds
// Rx.Observable.interval(500)
//     .bufferTime(2000)
//     .subscribe(createSubscriber("bufferTime"));

//Our own buffer time
// const stopSubject$ = new Rx.Subject();
// Rx.Observable.interval(500)
//    .buffer(stopSubject$)
//    .subscribe(createSubscriber("buffer"));
    
// setTimeout(() => {
//     stopSubject$.next();
// }, 3000);

//toArray(): will collect every single item from source stream and return an array
Rx.Observable.range(1, 10)
    .toArray()
    .subscribe(createSubscriber("range"));