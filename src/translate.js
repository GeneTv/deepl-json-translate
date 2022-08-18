const { getArgs, translateObject } = require('./utils');
const fs = require('fs');
const args = getArgs();

if (args.key === undefined) {
  throw new Error('No api key --key was provided.');
}

if (args.lang === undefined) {
  throw new Error('No language --lang was provided.');
}

if (args.input === undefined) {
  throw new Error('No input file --input was provided.');
}

if (args.output === undefined) {
  console.log('No output file was provided. Using stdout.');
}

const inputFile = JSON.parse(fs.readFileSync(args.input).toString('utf-8'));

translateObject(inputFile, args.key, args.lang).then(obj => {
  if (args.output === undefined) {
    return console.log(obj)
  }
  fs.writeFileSync(args.output, JSON.stringify(obj));
});
