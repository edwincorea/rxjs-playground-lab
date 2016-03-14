import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

/*
const simple$ = new Rx.Subject();

simple$.subscribe(createSubscriber("simple$"));

simple$.next("Hello");
simple$.next("World!");
simple$.complete();
*/

const interval$ = Rx.Observable.interval(1000).take(5);
const intervalSubject$ = new Rx.Subject();

//Use Case #1 for subjects: proxying a subscription with a subject (bridge)
/*
interval$.subscribe(intervalSubject$);
intervalSubject$.subscribe(createSubscriber("sub1"));
intervalSubject$.subscribe(createSubscriber("sub2"));
intervalSubject$.subscribe(createSubscriber("sub3"));

setTimeout(() => {
    intervalSubject$.subscribe(createSubscriber("subTO"));
},2000);
*/

//Use Case #2 for subjects: transformation pipelines
/*
const currentUser$ = new Rx.Subject();
const isLoggedIn$ = currentUser$.map(u => u.isLoggedIn);

isLoggedIn$.subscribe(createSubscriber("isLoggedIn"));
currentUser$.next({isLoggedIn: false});

setTimeout(() => {
    currentUser$.next({isLoggedIn: true, name: "Nelson"});
}, 2000);
*/

//Different kind of subjects...
//Behavior subjects, expect an initial state
/*
const currentUser$ = new Rx.BehaviorSubject({isLoggedIn: false});
const isLoggedIn$ = currentUser$.map(u => u.isLoggedIn);

currentUser$.next({isLoggedIn: false});
isLoggedIn$.subscribe(createSubscriber("isLoggedIn"));

setTimeout(() => {
    currentUser$.next({isLoggedIn: true, name: "Nelson"});
}, 3000);
  
//problem solved using behavior subjects
setTimeout(() => {
    isLoggedIn$.subscribe(createSubscriber("delayed"));
}, 1500);
*/

//Replay Subjects: Remember multiple values
/*
const replay$ = new Rx.ReplaySubject(3);
replay$.next(1);
replay$.next(2);

replay$.subscribe(createSubscriber("one"));
replay$.next(3);
replay$.next(4);
replay$.next(5);

replay$.subscribe(createSubscriber("two"));  
replay$.next(6);
*/

//Async subject for asynchronous operations.
//This subject will only emit the final item before it is completed.
const apiCall$ = new Rx.AsyncSubject();
apiCall$.next(1);

apiCall$.subscribe(createSubscriber("one"));
apiCall$.next(2);
apiCall$.complete();

setTimeout(()=>{
    apiCall$.subscribe(createSubscriber("two"));
}, 2000);