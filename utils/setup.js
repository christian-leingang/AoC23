import fs from 'fs';

// Get the current day of the month
const day = new Date().getDate().toString().padStart(2, '0');

// Create the directory
const dir = `./day${day}`;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Create the input files
fs.writeFileSync(`${dir}/input.txt`, '');
fs.writeFileSync(`${dir}/input_test.txt`, '');

// Create the index.js file
const code = `
function part1(input) {
  let result = 0;
  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;
  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\\r/g, '').trim().split('\\n')];
  part1(lines);
  part2(lines);
}
`;

fs.writeFileSync(`${dir}/index.js`, code.trim());

console.log('Setup complete.');
