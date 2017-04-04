'use strict'

const square = require('./square')  
const expect = require('chai').expect

describe('square', () => {
  it('should square a number', () => {
    expect(square(2)).to.equal(4);
  });
});
