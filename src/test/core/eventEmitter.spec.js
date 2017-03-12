
var chai = require('chai');
var assert = chai.assert; // we are using the "assert" style of Chai
var expect = chai.expect;
var corecallback = require('../../../build/core/callback');
var coreeventEmitter = require ('../../../build/core/eventEmitter');

class testEventEmitter extends coreeventEmitter.eventEmitter
{
    constructor(){
        super();
        
    }
    callsomething(){
        super.callEvent('on');
    }
    
}

describe('eventemiter', function() {
  it('must call our void function and result must be valid', function() {
      var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }
    //create a callback
    var callback = new corecallback.callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on',callback);
    //test on event
    testForEvent.callsomething();

    expect(testVariable).to.equal(1);
   
  });



it('add event, call, then remove event, and call again', function() {
    var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }
    //create a callback
    var callback = new corecallback.callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on',callback);
    //test on event
    testForEvent.callsomething();
    
    expect(testVariable).to.equal(1);
    testForEvent.removeEvent('on',callback);
    testForEvent.callsomething();
    expect(testVariable).to.equal(1);
   
  });

it('add event twice', function() {
     var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }
    //create a callback
    var callback = new corecallback.callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on',callback);
    //add again the same function
    testForEvent.addEvent('on',callback);
    //test on event
    testForEvent.callsomething();
    
    expect(testVariable).to.equal(2);
    
   
  });

it('add event twice and call twice', function() {
     var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }
    //create a callback
    var callback = new corecallback.callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on',callback);
    //add again the same function
    testForEvent.addEvent('on',callback);
    //test on event
    testForEvent.callsomething();
    
    expect(testVariable).to.equal(2);
    testForEvent.callsomething();
    expect(testVariable).to.equal(4);
    
   
  });


  it('add event twice, call, then remove one of them and call again', function() {
     var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }
    //create a callback
    var callback = new corecallback.callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on',callback);
    //add again the same function
    testForEvent.addEvent('on',callback);
    //test on event
    testForEvent.callsomething();    

    expect(testVariable).to.equal(2);

    testForEvent.removeEvent('on',callback);
    //test on event
    testForEvent.callsomething();
    
    expect(testVariable).to.equal(3);
    
   
  });

   it('add different callbacks and remove one of them', function() {
      var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }

 var testVariable2 = 0;
       function testfunc2(){
             testVariable2 += 1;
        }

    //create a callback
    var callback = new corecallback.callback(testfunc);
    var callback2 = new corecallback.callback(testfunc2);
    
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on',callback);
    //add again the same function
    testForEvent.addEvent('on',callback2);
    //test on event
    testForEvent.callsomething();    

    expect(testVariable).to.equal(1);
    expect(testVariable2).to.equal(1);

    testForEvent.removeEvent('on',callback);
    //test on event
    testForEvent.callsomething();
    
    expect(testVariable).to.equal(1);
    expect(testVariable2).to.equal(2);
    
   
  });




});