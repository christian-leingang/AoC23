import { getInput } from './helpers.js';

const isTest = process.argv[2] === 'test';
const day = process.argv[3] || '01';
const input = getInput(`./day${day}/`, isTest);

import(`../day${day}/index.js`).then((module) => {
  module.default(input);
});
