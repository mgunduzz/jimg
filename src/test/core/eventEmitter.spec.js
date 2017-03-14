var chai = require('chai');
var assert = chai.assert; // we are using the "assert" style of Chai
var expect = chai.expect;
var callback = require('../../../build/core/callback').callback;
var eventEmitter = require('../../../build/core/eventEmitter').eventEmitter;

class testEventEmitter extends eventEmitter {
  constructor() {
    super();

  }
  callsomething(thenfunc, done) {
    var promiseList = super.callEvent('on');

    Promise.all(promiseList).then(
      values => {
        thenfunc();
      }).catch(err => {
      done(err);
    });




  }

}



describe('eventemiter', function () {
  it('must call our void function and result must be valid', (done) => {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on', callbackFunc);

    //test on event

    testForEvent.callsomething(() => {
      expect(testVariable).to.equal(1);
      done();
    });



  });



  it('add event, call, then remove event, and call again', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(() => {
      expect(testVariable).to.equal(1);
      testForEvent.removeEvent('on', callbackFunc);
      testForEvent.callsomething(() => {
        expect(testVariable).to.equal(1);
        done();
      });

    });




  });

  it('add event twice', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on', callbackFunc);
    //add again the same function
    testForEvent.addEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(() => {
      expect(testVariable).to.equal(2);
      done();
    }, done);




  });

  it('add event twice and call twice', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on', callbackFunc);
    //add again the same function
    testForEvent.addEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(() => {

      expect(testVariable).to.equal(2);
      testForEvent.callsomething(() => {
        expect(testVariable).to.equal(4);
        done();
      });
    });


  });


  it('add event twice, call, then remove one of them and call again', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on', callbackFunc);
    //add again the same function
    testForEvent.addEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(()=>{
      expect(testVariable).to.equal(2);
      testForEvent.removeEvent('on', callbackFunc);
      testForEvent.callsomething(()=>{
        expect(testVariable).to.equal(3);
        done();
      });

    });
       

  });

  it('add different callbacks and remove one of them', function(done) {
      var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }

       var testVariable2 = 0;
       function testfunc2(){
             testVariable2 += 1;
        }

    //create a callback
    var callbackFunc = new callback(testfunc);
    var callbackFunc2 = new callback(testfunc2);
    
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.addEvent('on',callbackFunc);
    //add again the same function
    testForEvent.addEvent('on',callbackFunc2);
    //test on event
    testForEvent.callsomething(()=>{
      
      expect(testVariable).to.equal(1);
      expect(testVariable2).to.equal(1);

      testForEvent.removeEvent('on',callbackFunc);
      testForEvent.callsomething(()=>{
          expect(testVariable).to.equal(1);
          expect(testVariable2).to.equal(2);
          done();
      });

    });    
   
    
   
  });




});