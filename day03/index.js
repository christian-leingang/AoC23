function getSurroundings(array, index, numLength) {
  const surroundings = [];
  const [x, y] = index;
  for (let i = x - 1; i <= x + 1; i++) {
    if (array[i]) {
      for (let j = y - 1; j <= y + numLength; j++) {
        if (array[i][j]) surroundings.push(array[i][j]);
      }
    }
  }
  return surroundings;
}

function sumPartNumbers(lines) {
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const numbers = [...lines[i].matchAll(/\d+/g)];
    for (let { index, 0: number } of numbers) {
      const surroundings = getSurroundings(lines, [i, index], number.toString().length);
      const symbolRegex = /[^\d.\s]/;
      if (surroundings.some((cell) => symbolRegex.test(cell))) {
        sum += +number;
      }
    }
  }
  return sum;
}

function getGearSurroundings(array, index) {
  const surroundingsNo = [];
  const [x, y] = index;
  for (let i = x - 1; i <= x + 1; i++) {
    if (array[i]) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (array[i][j]) {
          const cell = array[i][j];
          if (/\d/.test(cell)) {
            let temp_j = j;
            while (/\d/.test(array[i][temp_j])) temp_j--;

            const match = array[i].substring(temp_j).match(/(\d+)/g);
            if (match) {
              const number = match.find((num) => num.includes(cell));
              if (!isNaN(+array[i][j + 1])) j += number.length - 1;
              surroundingsNo.push(number);
            }
          }
        }
      }
    }
  }
  return surroundingsNo;
}

function sumGearNumbers(lines) {
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === '*') {
        const surroundings = getGearSurroundings(lines, [i, j]);
        const numberRegex = /\d+/;
        const matchingCells = surroundings.filter((cell) => numberRegex.test(cell));
        if (matchingCells.length === 2) {
          sum += +matchingCells[0] * +matchingCells[1];
        }
      }
    }
  }
  return sum;
}

function part1(input) {
  let result = sumPartNumbers(input);
  console.log('Part 1: ', result);
}

function part2(input) {
  let result = sumGearNumbers(input);
  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
