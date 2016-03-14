import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util"

/*
Rx.Observable.interval(500)
    .take(5)
    .subscribe(createSubscriber("interval"));
*/
    
/*
Rx.Observable.timer(1000, 500)
    .take(3)
    .subscribe(createSubscriber("timer"));
*/

//Using of: takes n arguments, each one being a next() regardless if any of them is iterable
/*
Rx.Observable.of("Hello, World!", 42, "hei")
    .subscribe(createSubscriber("of"));
*/  

//Using from: takes n iterable arguments
/*
Rx.Observable.from(["Hello, World!", 42, "hei"])
    .subscribe(createSubscriber("from"));

const arr = [1, 2, 3, 4, 5];
Rx.Observable.from(arr)
    .map(i => i * 5)
    .subscribe(createSubscriber("from"));
*/

//Using throw: throw an error
/*
Rx.Observable.throw(new Error("Oops! :("))
    .subscribe(createSubscriber("throw"));
*/

//Using empty: produce no items but completes
/*
Rx.Observable.empty()
    .subscribe(createSubscriber("empty"));
*/

//Using defer: side effects
/*
let sideEffect = 0;
const defer$ = Rx.Observable.defer(()=> {
   sideEffect++;
   return Rx.Observable.of(sideEffect);     
});
   
defer$.subscribe(createSubscriber("defer$.one"));
defer$.subscribe(createSubscriber("defer$.two"));
defer$.subscribe(createSubscriber("defer$.three"));
*/

//Using never: produce no items and never completes
/*
Rx.Observable.never()
    .subscribe(createSubscriber("never"));
*/

//Using range: start and count
Rx.Observable.range(10, 30)
    .subscribe(createSubscriber("range"));

    



