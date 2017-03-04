
var chai = require('chai');
var expect = chai.expect;

var global = require('../../build/i10n');


describe('i10n', function() {
  it('errImageWidthOrHeightNotValid msg must be with default', function() {
    
    expect(global.i10n.errImageWidthOrHeightNotValid()).to.equal('image width and height must be between 1-65535');
   
  });
  
});