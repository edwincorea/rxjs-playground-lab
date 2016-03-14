import Rx from "rxjs/Rx";
import {createSubscriber} from "./lib/util";

//hot observable:   active sequences such as Rx.Observable.fromEvent.
//                  Produce notifications regardless of subscriptions
//cold observable:  passive sequences such as Rx.Observable, Rx.Subject. 
//                  Start producing notifications on request (when subscribed to).
//http://www.introtorx.com/content/v1.0.10621.0/14_HotAndColdObservables.html
//sockets or big computation. We want hot observables which share data and don't call the observable on every subscription.  

//Creating a hot observable from a cold observable using publish
//It returns a connectable observable. 
//This means the returned connectable observable won't subscribe to the underlying observable (interval) 
//until we call the method connect() on the underlying observable.   
/*
const interval$ = Rx.Observable.interval(1000).
take(10).
publish();

//The subscribe() method is not causing the interval to execute.
//Interval only starts executing after connect() method is called.
//When connect is called, the two subscribers SHARE their interval observable.   
setTimeout(() => {
    //let's connect the returned observable
    interval$.connect();    
}, 5000);


setTimeout(() => {
    interval$.subscribe(createSubscriber("one"));    
}, 1200);

setTimeout(() => {
    interval$.subscribe(createSubscriber("two"));    
}, 3200);
*/

//Use Case #1: chat messaage is a cold observer.
//It´s a cold observable because socket.on is 'subscribed to' everytime we subscribe to chatMessages$    
/*
const socket = { on: () => { } };

const chatMessages$ = new Rx.Observable(observer => {
    console.log("subscribed");
    socket.on("chat:message", message => observer.next(message)); 
});

chatMessages$.subscribe(createSubscriber("one"));
chatMessages$.subscribe(createSubscriber("two"));
*/

//Use Case #1: chat messaage turned into a hot observable
/*
const socket = { on: () => { } };

const chatMessages$ = new Rx.Observable(observer => {
    console.log("subscribed");
    socket.on("chat:message", message => observer.next(message)); 
}).publish();

chatMessages$.connect();

//now both subscribers get the same values
chatMessages$.subscribe(createSubscriber("one"));
chatMessages$.subscribe(createSubscriber("two"));
*/

//Use Case #2: another way of creating a hot observable, like an async subject. Always returns the last value.
/*
const simple$ = new Rx.Observable(observer => {    
    observer.next("one"); 
    observer.next("two");
    observer.complete();
});

const published$ = simple$.publishLast();

published$.subscribe(createSubscriber("one"));
published$.connect();
published$.subscribe(createSubscriber("two"));
*/

//Use Case #3: another way of creating a hot observable, like an replay subject.
/*
const simple$ = new Rx.Observable(observer => {    
    observer.next("one"); 
    observer.next("two");
    observer.next("three");
    //observer.complete();
    
    return () => console.log("Disposed");
});

const published$ = simple$.publishReplay(2);

//subscriber 'one' gets sequence ['one', 'two', 'three'] because it subscribes before connect
//after we connect, we generated that sequence. We resubscribe with subscriber 'two'.
//Subscriber 'two' only gets sequence ['2', '3']  because we only publish replay(2). 
const sub1 = published$.subscribe(createSubscriber("one"));
//how to dispose the observable? we need a reference to connect
//published$.connect();
const connection = published$.connect();
const sub2 = published$.subscribe(createSubscriber("two"));

sub1.unsubscribe();
sub2.unsubscribe();
connection.unsubscribe();
*/

//Use Case #4:  using refcount. It's a way of automatically handle the connection and unsubscription of a connectable observable
//              using share() 
const simple$ = new Rx.Observable(observer => {    
    observer.next("one"); 
    observer.next("two");
    observer.next("three");
    
    return () => console.log("Disposed");
});

//const published$ = simple$.publishReplay(2).refCount();
//share has the same behaviour as publish().refcount(). It will connect to the observable on the first subscription and disconnect on the last subscription
const published$ = simple$.share();

const sub1 = published$.subscribe(createSubscriber("one"));
//we don't need connect because refcount with connect to the observable on the first subscription (sub1).
//It will disconnect the connectable observable when the last subscription disconnects.
//const connection = published$.connect();
const sub2 = published$.subscribe(createSubscriber("two"));

sub1.unsubscribe();
sub2.unsubscribe();
