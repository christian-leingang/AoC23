function predictNextNumber(line) {
  let differences = [line.map(Number)];
  let newNumbers = [0];

  for (let level = 0; ; level++) {
    differences.push(differences[level].slice(1).map((num, i) => num - differences[level][i]));
    if (differences[level].every((el) => el === 0)) {
      for (let i = level - 1; i >= 0; i--) {
        newNumbers.push(differences[i].at(-1) + newNumbers.at(-1));
      }
      return newNumbers.at(-1);
    }
  }
}

function part1(input) {
  let result = 0;
  for (let line of input) {
    const nextNumber = predictNextNumber(line.split(' '));
    result += nextNumber;
  }
  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;
  for (let line of input) {
    const nextNumber = predictNextNumber(line.split(' ').reverse());
    result += nextNumber;
  }
  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
