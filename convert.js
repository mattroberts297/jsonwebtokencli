'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (options) => {
  if (options.decode) {
    if (
      options.hasOwnProperty('secret') ||
      options.hasOwnProperty('public-key-file')
    ) {
      if (options.hasOwnProperty('public-key-file')) {
        options.secret = fs.readFileSync(options['public-key-file']);
      }
      return JSON.stringify(jwt.verify(
        options.jwt,
        options.secret,
        {
          algorithms: options.algorithms
        }
      ));
    } else {
      return JSON.stringify(jwt.decode(options.jwt));
    }
  } else if (options.encode) {
    if (options.hasOwnProperty('private-key-file')) {
      options.secret = fs.readFileSync(options['private-key-file']);
    }
    return jwt.sign(
      JSON.parse(options.jwt),
      options.secret,
      {
        algorithm: options.algorithm,
        noTimestamp: !options.timestamp
      }
    );
  }
};
