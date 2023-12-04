function getWinningMatches(line) {
  let matches = 0;
  const numbers = line.split(':')[1];
  const winners = numbers.split("|")[0].trim().split(/\s+/).map(x => parseInt(x));
  const myNumbers = numbers.split("|")[1].trim().split(/\s+/).map(x => parseInt(x));
  for(let winner of winners) {
    if (myNumbers.includes(winner)) {
      matches++;
    }
  }
  return matches;
}

function part1(input) {
  let result = 0;
  for (let line of input) {
    let matches = getWinningMatches(line);
    if (matches > 0) {
      result += 2 ** (matches -1 );
    }
  }

  console.log('Part 1: ', result);
}

function part2(input) {
  let resultFinal = 0;
  const cardInstances = new Array(input.length).fill(1);

  for (let lineNo = 0; lineNo < input.length; lineNo++) {
    const result = getWinningMatches(input[lineNo]);

    if (result > 0) {
      for (let i = lineNo + 1; i <= Math.min(lineNo + result, input.length - 1); i++) {
        cardInstances[i] += cardInstances[lineNo];
      }
    }
  }
  resultFinal = cardInstances.reduce((acc, v) => acc + v, 0);
  console.log('Part 2: ', resultFinal);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}