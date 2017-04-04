'use strict'

const convert = require('./convert')
const expect = require('chai').expect

describe('convert', () => {
  it('decode a jwt using HS256', () => {
    var options = {
      algorithms: ['HS256', 'HS384'],
      decode: true,
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
      secret: 'secret'
    };
    var decoded = JSON.parse(convert(options));
    expect(decoded).to.have.property('sub');
    expect(decoded).to.have.property('name');
    expect(decoded).to.have.property('admin');
    expect(decoded.sub).to.equal('1234567890');
    expect(decoded.name).to.equal('John Doe');
    expect(decoded.admin).to.equal(true);
  });

  it('encode a jwt using HS256', () => {
    var options = {
      algorithm: 'HS256',
      encode: true,
      timestamp: false,
      jwt: '{ "sub": "1234567890", "name": "John Doe", "admin": true }',
      secret: 'secret'
    };
    var encoded = convert(options);
    expect(encoded).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
  });

  it('decode a jwt using RS256', () => {
    var options = {
      algorithms: ['RS256'],
      decode: true,
      jwt: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.EkN-DOsnsuRjRO6BxXemmJDm3HbxrbRzXglbN2S4sOkopdU4IsDxTI8jO19W_A4K8ZPJijNLis4EZsHeY559a4DFOd50_OqgHGuERTqYZyuhtF39yxJPAjUESwxk2J5k_4zM3O-vtd1Ghyo4IbqKKSy6J9mTniYJPenn5-HIirE',
      'public-key-file': './public.key'
    };
    var decoded = JSON.parse(convert(options));
    expect(decoded).to.have.property('sub');
    expect(decoded).to.have.property('name');
    expect(decoded).to.have.property('admin');
    expect(decoded.sub).to.equal('1234567890');
    expect(decoded.name).to.equal('John Doe');
    expect(decoded.admin).to.equal(true);
  });

  it('encode a jwt using RS256', () => {
    var options = {
      algorithm: 'RS256',
      encode: true,
      timestamp: false,
      jwt: '{ "sub": "1234567890", "name": "John Doe", "admin": true }',
      'private-key-file': './private.key'
    };
    var encoded = convert(options);
    expect(encoded).to.equal('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.EkN-DOsnsuRjRO6BxXemmJDm3HbxrbRzXglbN2S4sOkopdU4IsDxTI8jO19W_A4K8ZPJijNLis4EZsHeY559a4DFOd50_OqgHGuERTqYZyuhtF39yxJPAjUESwxk2J5k_4zM3O-vtd1Ghyo4IbqKKSy6J9mTniYJPenn5-HIirE');
  });
});
