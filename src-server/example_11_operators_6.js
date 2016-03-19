import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

//cold observable: called everytime we subscribe to it
// const simple$ = new Rx.Observable(observer => {
//    console.log("Generating sequence");
//    observer.next(1); 
//    observer.next(2);
//    observer.next(3);
//    observer.next(4);
//    observer.complete();
// });

// //first: gets the first item and completes subscription
// simple$.first()
//     .subscribe(createSubscriber("first"));
    
// //last: gets last item and completes
// simple$.last()
//     .subscribe(createSubscriber("last"));    
    
// //single: admits only one elements, sequence error if many elents available 
// simple$.single()
//     .subscribe(createSubscriber("single"));        
    
// //single: takes n items from sequence 
// simple$.take(2)
//     .subscribe(createSubscriber("take"));        
    
// //single: skips n items from sequence 
// simple$.skip(2)
//     .subscribe(createSubscriber("skip"));        

//takeWhile and skipWhile
// Rx.Observable.interval(500)
//     .skipWhile(i => i < 4)
//     .takeWhile(i => i < 10)
//     .subscribe(createSubscriber("skipWhile"));    
    
//takeUntil and skipUntil: take an observable
Rx.Observable.interval(500)
    .skipUntil(Rx.Observable.timer(2000))//could be a subject or a result from any other observable
    .takeUntil(Rx.Observable.timer(4000))//could be a subject or a result from any other observable
    .subscribe(createSubscriber("skipUntil"));    
