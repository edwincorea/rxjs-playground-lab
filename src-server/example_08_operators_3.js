import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

//map: array of evaluated items of an array of objects
/*
Rx.Observable.interval(1000)
    .take(3)
    .map(a => a * a)
    .subscribe(createSubscriber("map"));
 
function arrayMap(array, projection){
    const returnArray = [];
    for (let item of array){
        const projectedItem = projection(item);
        returnArray.push(projectedItem);
    }        
     
    return returnArray;
}

//console.log(arrayMap([1, 2, 3], a => a * a));


//mergemap: equivalent of selectMany. Flat array of objects from an array of compund objects.
function arrayMergeMap(array, projection){
    const returnArray = [];
    
    for (let item of array){
        const projectedArray = projection(item);
        for (let item of projectedArray){
            returnArray.push(item);            
        }
    }        
     
    return returnArray;        
}

const albums = [
    {title: "Album1", tracks: [{id: 1, title: "Track 11"}, {id: 2, title: "Track 12"}]},
    {title: "Album2", tracks: [{id: 3, title: "Track 21"}, {id: 4, title: "Track 22"}]}
]; 

console.log("Map");//array of arrays
const tracksWrong = arrayMap(albums, album => album.tracks);
console.log(JSON.stringify(tracksWrong));
console.log("\n");
console.log("MergeMap");//single array
const tracksRight = arrayMergeMap(albums, album => album.tracks);
console.log(JSON.stringify(tracksRight)); 
*/

// Rx.Observable.range(2, 3)
//     .mergeMap(i => Rx.Observable.timer(i * 2000 ).map( () => `After ${i * 2} Seconds`))
//     .subscribe(createSubscriber("mergeMap"));


//promises and mergemap
// Rx.Observable.fromPromise(getTracks())
//     .mergeMap(tracks => Rx.Observable.from(tracks))
//     .subscribe(createSubscriber("tracks"));

// function getTracks(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(["track 1", "track 2", "track 3"]);
//         }, 1000);        
//     });
// }

//asynchronous operations and mergemap
// Rx.Observable.of("my query") //i.e. onkeyup inputbox
//     .do(() => console.log("querying..."))
//     .mergeMap(a => query(a))
//     .do(() => console.log("after query..."))
//     .subscribe(createSubscriber("query"));

// function query(value){
//     return new Promise((resolve, reject) => {
//         setTimeout(function() {
//             resolve("This is the value! :)");
//         }, 1000);        
//     });    
// }

//switchmap: it only returns the latest value. Very useful in user interfaces with async ops, just use the latest user request.
