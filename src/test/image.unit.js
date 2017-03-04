var chai = require('chai');
var assert = chai.assert; // we are using the "assert" style of Chai
var expect = chai.expect;
var jimg = require('../../build/image');
var global = require('../../build/i10n');
var err = require('../../build/exception')


describe('Image', function() {
  it('constructor must be valid', function() {
    var img = new jimg.image(5,10);
    expect(img.width()).to.equal(5);
   
  });
  it('constructor must throw exception',function(){
    expect(()=>new jimg.image(-1,100)).to.throw(Error);
  });
  it('constructor must throw exception',function(){
    expect(()=>new jimg.image(10,-1)).to.throw(Error);
  })
});