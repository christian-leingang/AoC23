const numbersSpelled = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function getFirstDigit(line) {
  const numericMatch = line.match(/\d/);
  if (numericMatch) return +numericMatch[0];

  for (let i = 0; i < line.length; i++) {
    for (const [word, number] of Object.entries(numbersSpelled)) {
      if (line.substr(i, word.length) === word) return number;
    }
  }

  return null;
}

function getLastDigit(line) {
  const numericMatch = line.match(/\d/g);
  if (numericMatch) return +numericMatch[numericMatch.length - 1];

  for (let i = line.length - 1; i >= 0; i--) {
    for (const [word, number] of Object.entries(numbersSpelled)) {
      if (line.substr(i - word.length + 1, word.length) === word) return number;
    }
  }

  return null;
}

function part1(input) {
  let result = 0;

  const numberInput = input.map((line) => {
    let numbers = line.replace(/[^0-9]/g, '');
    return +(numbers[0] + numbers.at(-1));
  });

  result = numberInput.reduce((acc, cur) => acc + cur, 0);

  console.log('Part 1: ', result);
}

function part2(input) {
  let sum = 0;
  for (const line of input) {
    const firstDigit = getFirstDigit(line);
    const lastDigit = getLastDigit(line);
    if (firstDigit !== null && lastDigit !== null) {
      sum += firstDigit * 10 + lastDigit;
    }
  }
  console.log('Part 2: ', sum);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
