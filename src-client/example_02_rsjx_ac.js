import $ from "jquery";
import Rx from "rxjs/Rx";

//jquery objects convention, $ at the beginning
const $title = $("#title");
const $results = $("#results");

Rx.Observable.fromEvent($title, "keyup")
    .map(e => e.target.value)
    .distinctUntilChanged()
    .debounceTime(500)
    .switchMap(getItems)
    .subscribe(items => {
       $results.empty();
       $results.append(items.map(item => $(`<li />`).text(item)));        
    });   


//observable object convention, $ at the end
//observable object represents a stream of events
/*
const keyUps$ = Rx.Observable.fromEvent($title, "keyup"); //In React paradigm everything is a database, such as events
const queries$ = keyUps$
                 .map(e => e.target.value)
                 .distinctUntilChanged()
                 .debounceTime(250)
                 //3) .mergeMap(query => getItems(query)); //flatMap alias
                 .switchMap(query => getItems(query)); // flatMap latest

//1) keyUps$.subscribe(e => {
//2) queries$.subscribe(query => {
queries$.subscribe(items => {
    //2) getItems(query)
        //2) .then(items => {
           $results.empty();
           $results.append(items.map(r => $(`<li />`).text(r)));            
        //2) });  
});
*/

// ------------
// Library
function getItems(title){
    console.log(`Querying ${title}`);
    // return a promise (asynchronous object)
    return new Promise((resolve, reject) => {
       window.setTimeout(() => {
           resolve([title, "Item 2", `Another ${Math.random()}`]);           
       }, 500 + (Math.random() * 2000)); 
    });
}