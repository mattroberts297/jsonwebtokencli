#! /usr/bin/env node
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage')
const getStdin = require('get-stdin');
const convert = require('./convert');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean, defaultValue: false },
  { name: 'decode', alias: 'd', type: Boolean, defaultValue: false },
  { name: 'encode', alias: 'e', type: Boolean, defaultValue: false },
  { name: 'secret', alias: 's', type: String, defaultValue: 'secret' },
  { name: 'private-key-file', type: String },
  { name: 'public-key-file', type: String },
  { name: 'timestamp', alias: 't', type: Boolean, defaultValue: false },
  { name: 'algorithm', type: String, defaultValue: 'HS256' },
  { name: 'algorithms', type: String, multiple: true, defaultValue: ['HS256', 'HS384'] },
  { name: 'jwt', type: String, defaultOption: true }
]

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something [italic]{very} important.'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
]

const options = commandLineArgs(optionDefinitions);

if (options.help) {
  const usage = getUsage(sections)
  console.log(usage)
} else {
  getStdin().then(stdin => {
    if (!options.jwt) { options.jwt = stdin; }
    return convert(options);
  }).then(res => {
    console.log(res);
  }, err => {
    console.log(err);
  });
}
