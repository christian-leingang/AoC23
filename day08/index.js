function parseLine(line) {
  const [key, values] = line.split(' = ');
  const [left, right] = values.replace('(', '').replace(')', '').split(', ');
  return [key, { left, right }];
}

function part1(input) {
  let result = 0;
  let currentNode = 'AAA';
  let instructionIndex = 0;
  const instructions = [...input.at(0)];
  const navigationMap = new Map(input.slice(2).map(parseLine));

  while (currentNode !== 'ZZZ') {
    const instruction = instructions[instructionIndex % instructions.length];
    const { left, right } = navigationMap.get(currentNode);
    currentNode = instruction === 'L' ? left : right;
    instructionIndex++;
    result++;
  }

  console.log('Part 1: ', result);
}

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (arr) => arr.reduce(lcm, 1);

function part2(input) {
  let time = 0;
  const instructions = [...input.at(0)];
  const navigationMap = new Map(input.slice(2).map(parseLine));
  let currentNodes = Array.from(navigationMap.keys()).filter((key) => key.endsWith('A'));
  let firstEncounterTimes = new Map();

  while (currentNodes.length > 0) {
    const nextNodes = [];
    for (const currentNode of currentNodes) {
      const { left, right } = navigationMap.get(currentNode);
      const nextNode = instructions[time % instructions.length] === 'L' ? left : right;
      if (nextNode.endsWith('Z') && !firstEncounterTimes.has(nextNode)) {
        firstEncounterTimes.set(nextNode, time + 1);
      } else {
        nextNodes.push(nextNode);
      }
    }
    currentNodes = nextNodes;
    time++;
  }

  return lcmAll(Array.from(firstEncounterTimes.values()));
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  console.log(part2(lines));
}
