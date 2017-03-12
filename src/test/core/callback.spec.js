
var chai = require('chai');
var assert = chai.assert; // we are using the "assert" style of Chai
var expect = chai.expect;
var corecallback = require('../../../build/core/callback');



describe('callback', function() {
  it('must call our void function and result must be valid', function() {
      var testVariable = 0;
       function testfunc(){
             testVariable = 1;
        }

    var callback = new corecallback.callback(testfunc);
    callback.call();
    expect(testVariable).to.equal(1);
   
  });
  it('must not call our void function and result must be valid', function() {
      var testVariable = 0;
       function testfunc(){
             testVariable = 1;
        }

    var callback = new corecallback.callback();
    callback.call();
    expect(testVariable).to.equal(0);
   
  });
   it('must  call our return function and result must be valid', function() {
      
       function testfunc(variable){
             return variable + 6;
        }

    var callback = new corecallback.callback(testfunc);
    
    expect(callback.call(5)).to.equal(11);
   
  });

  it('must  call our return function with an object and result must be valid', function() {
      
       function testfunc(variable){
             variable.x += 10;
             variable.y += 20;
        }

    var callback = new corecallback.callback(testfunc);
    var obj = { x: 1,y: 2};
    callback.call(obj);
    expect(obj.x).to.equal(11);
    expect(obj.y).to.equal(22);
   
  });
  
});