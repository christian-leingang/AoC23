import { getInput } from './helpers.js';

const day = process.argv[2] || '01';
const isTest = process.argv[3] === 'test';
const input = getInput(`./day${day}/`, isTest);

import(`../day${day}/index.js`).then((module) => {
  module.default(input);
});
