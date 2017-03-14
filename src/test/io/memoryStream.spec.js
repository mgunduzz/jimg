
var chai = require('chai');
var assert = chai.assert; // we are using the "assert" style of Chai
var expect = chai.expect;
var callback = require('../../../build/core/callback').callback;
var memoryStream = require('../../../build/io/memoryStream').memoryStream;
var errors = require ('../../../build/core/errors').errors;
 


describe('memoryStream', function(done) {
    
    var ms = new memoryStream(buffer);
    var buffer = new Uint8ClampedArray(1024);
    beforeEach('some description', function() {
       for(let i =0; i< buffer.length;++i){
             buffer[i]=i;
       }
        ms = new memoryStream(buffer);
      });

  
   
  
  it('must read all data correctly', function(done) {     
    expect(buffer[1]).to.equal(1);
      var bufferlocal = new Uint8ClampedArray(1024);
      var offset = 0;
      function read(data){
        let arr = new Uint8ClampedArray(data);
        for(var i=0;i<arr.length;++i)
            bufferlocal[offset+i]=arr[i];
        offset +=arr.length;
      }
      function testData(){
        for(var i=0;i<bufferlocal.length;++i)
           if(buffer[i]!=bufferlocal[i])
              return false;
        return true;
      }
      ms.addEvent('onError',new callback((err)=>{
         done(err.msg);
      }));
       ms.addEvent('onDataFinished',new callback(()=>{
        expect(testData()).to.equal(true);
        done();
      }));
      ms.addEvent('onData',new callback(read));
     
    
   
  });


it('must onError call', function(done) {     
    expect(buffer[1]).to.equal(1);
      
      class streamMemoryError extends memoryStream{

         _read(start,count) {
           this._lastError = errors.indexOutOfRange;
           return undefined;

         }
      }

      ms = new streamMemoryError(buffer);

      function read(data){
      
      }
      function testData(){
        for(var i=0;i<bufferlocal.length;++i)
           if(buffer[i]!=bufferlocal[i])
              return false;
        return true;
      }
      ms.addEvent('onError',new callback((err)=>{
        expect(err.errNo).to.equal(errors.indexOutOfRange.errNo);
        done();
      }));      
      ms.addEvent('onData',new callback(read));
     
    
   
  });


});