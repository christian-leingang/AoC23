import { getInput } from './helpers.js';

const isTest = process.argv[2] === 'test';
let day = process.argv[3] || new Date().getDate().toString().padStart(2, '0');
const input = getInput(`./day${day}/`, isTest);

import(`../day${day}/index.js`).then((module) => {
  module.default(input);
});
