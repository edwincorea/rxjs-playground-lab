import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

//zip: combines two arrays using a selector function on every array item

// as a function implementation first
// function arrayZip(array1, array2, selector){
//     const count = Math.min(array1.length, array2.length);
//     const results = [];
    
//     for(let i = 0; i < count; i++){
//         const combined = selector(array1[i], array2[i]);
//         results.push(combined);        
//     }    
    
//     return results;
// }

// const array1 = [32, 2, 52, 43, 54];
// const array2 = [1, 0, 10, 4, 1, 4, 1, 6, 2, 4];

// const results = arrayZip(array1, array2, (left, right) => left * right);
// console.log(results); //[ 32, 0, 520, 172, 54 ]

// Now using observables: left is source observable range, right is interval * 500 (0*500, 1*500), selector is (left, right)
//zipping two observables... 
// Rx.Observable.range(1, 10)
//     .zip(Rx.Observable.interval(500), (left, right) => `Item: ${left}, at ${right * 500}`)
//     .subscribe(createSubscriber("zip"));

//left: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//right [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//selector: Item: 1, at 0, Item: 2, at 500, Item: 3, at 1000, etc. 

//withLatestFrom: admits an item when the source admits an item. Then, it admits a new item with the last item admited by the destination  
//  Rx.Observable.interval(1000)     
//      .withLatestFrom(Rx.Observable.interval(500))
//      .take(10)
//      .subscribe(createSubscriber("withLatestFrom"));
    
/*
withLatestFrom.next 0,0
withLatestFrom.next 1,3
withLatestFrom.next 2,5
withLatestFrom.next 3,7
withLatestFrom.next 4,9
withLatestFrom.next 5,11
withLatestFrom.next 6,13
withLatestFrom.next 7,15
withLatestFrom.next 8,17
withLatestFrom.next 9,19
withLatestFrom.complete
*/

//combineLatest: will admit an item if either of those admit an item
//  Rx.Observable.interval(1000)     
//      .combineLatest(Rx.Observable.interval(500))
//      .take(10)
//      .subscribe(createSubscriber("combineLatest"));
     
/*
combineLatest.next 0,0
combineLatest.next 0,1
combineLatest.next 0,2
combineLatest.next 0,3
combineLatest.next 1,3
combineLatest.next 1,4
combineLatest.next 1,5
combineLatest.next 2,5
combineLatest.next 2,6
combineLatest.next 2,7
combineLatest.complete
*/

//combineLatest: using a selector
//  Rx.Observable.interval(1000)     
//      .combineLatest(Rx.Observable.interval(500), (left, right) => left * right)
//      .take(10)
//      .subscribe(createSubscriber("combineLatest"));
     
/*
combineLatest.next 0
combineLatest.next 0
combineLatest.next 0
combineLatest.next 0
combineLatest.next 3
combineLatest.next 4
combineLatest.next 5
combineLatest.next 10
combineLatest.next 12
combineLatest.next 14
combineLatest.complete
*/     

const currentUser$ = new Rx.BehaviorSubject({isLoggedIn: false});
//faking an event such as authentication/authorization
//deconstruction is () =>
//perform the last operation, use combineLatest 
Rx.Observable.interval(1000)
    //.withLatestFrom(currentUser$)
    .combineLatest(currentUser$)//pause observables until a user logs in by combining it with current user  
    .filter(([i, user]) => user.isLoggedIn)
    .subscribe(createSubscriber("withLatestFrom"));
    
setTimeout(() => {
    currentUser$.next({isLoggedIn: true});    
}, 2500);    

























