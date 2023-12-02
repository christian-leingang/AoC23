const numbersSpelled = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };

const pattern = new RegExp(Object.keys(numbersSpelled).join('|'), 'g');

function getDigits(line) {
  const numericMatches = line.match(/\d/g);
  const wordMatches = line.match(pattern);

  let firstDigit = null;
  let lastDigit = null;

  if (numericMatches) {
    firstDigit = +numericMatches[0];
    lastDigit = +numericMatches[numericMatches.length - 1];
  }

  if (wordMatches) {
    const firstWordIndex = line.indexOf(wordMatches[0]);
    if (firstDigit === null || firstWordIndex < line.indexOf(firstDigit.toString())) {
      firstDigit = numbersSpelled[wordMatches[0]];
    }

    const lastWordIndex = line.lastIndexOf(wordMatches[wordMatches.length - 1]);
    if (lastDigit === null || lastWordIndex > line.lastIndexOf(lastDigit.toString())) {
      lastDigit = numbersSpelled[wordMatches[wordMatches.length - 1]];
    }
  }

  return { firstDigit, lastDigit };
}

function part1(input) {
  const result = input.reduce((acc, line) => {
    let numbers = line.replace(/[^0-9]/g, '');
    return acc + +(numbers[0] + numbers.at(-1));
  }, 0);

  console.log('Part 1: ', result);
}

function part2(input) {
  let sum = 0;
  for (const line of input) {
    const { firstDigit, lastDigit } = getDigits(line);
    if (firstDigit !== null && lastDigit !== null) {
      console.log(firstDigit, lastDigit);
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
