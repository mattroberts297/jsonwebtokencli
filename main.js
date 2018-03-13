#! /usr/bin/env node
'use strict';

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const getStdin = require('get-stdin');
const convert = require('./convert');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean, defaultValue: false, description: 'Display this help' },
  { name: 'decode', alias: 'd', type: Boolean, defaultValue: false, description: 'Decode an encoded jwt token' },
  { name: 'encode', alias: 'e', type: Boolean, defaultValue: false, description: 'Encode a decoded jwt token - requires secret or private key' },
  { name: 'secret', alias: 's', type: String, description: 'Used with decode and encode - when used with decode the jwt token is verified' },
  { name: 'private-key-file', type: String, description: 'Used with encode - the key to sign a decoded jwt token with' },
  { name: 'public-key-file', type: String, description: 'When used with decode the encoded jwt token is verified' },
  { name: 'keyid', alias: 'k', type: String, description: 'When used with encode sets the kid in jwt header' },
  { name: 'timestamp', alias: 't', type: Boolean, defaultValue: false, description: 'Used with encode - whether or not to include iat' },
  { name: 'ignore-expiration', alias: 'i', type: Boolean, defaultValue: false, description: 'Used with decode - whether to ignore exp' },
  { name: 'complete', alias: 'c', type: Boolean, defaultValue: false, description: 'Used with decode - whether to decode header and payload' },
  { name: 'algorithm', type: String, defaultValue: 'HS256', description: 'Used with encode - supported values include HS256, HS384 and RS256' },
  { name: 'algorithms', type: String, multiple: true, defaultValue: ['HS256', 'HS384'], description: 'Used with decode - requires secret or private key' },
  { name: 'jwt', type: String, defaultOption: true, description: 'The jwt to decode or encode - falls back to stdin' }
];

const sections = [
  {
    header: 'jsonwebtokencli v1.3.0',
    content: 'A json web token command line interface'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
];

const options = commandLineArgs(optionDefinitions);

getStdin().then(stdin => {
  if (!options.jwt) { options.jwt = stdin.trim(); }
  if (options.help || options.jwt === '') {
    return getUsage(sections);
  } else {
    return convert(options);
  }
}).then(res => {
  console.log(res);
}, err => {
  console.log(err);
});
