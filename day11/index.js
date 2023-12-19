function part1(input) {
  let result = 0;

  // Convert input to 2D array
  let grid = input.map((line) => line.split(''));

  // Duplicate lines with only "."
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].every((char) => char === '.')) {
      grid.splice(i + 1, 0, [...grid[i]]);
      i++;
    }
  }

  // Duplicate columns with only "."
  for (let j = 0; j < grid[0].length; j++) {
    if (grid.every((row) => row[j] === '.')) {
      grid.forEach((row) => row.splice(j + 1, 0, '.'));
      j++;
    }
  }

  //get all coordinates of # inside an array
  let galaxies = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '#') {
        for (let [x, y] of galaxies) {
          result += Math.abs(x - i) + Math.abs(y - j);
        }
        galaxies.push([i, j]);
      }
    }
  }

  console.log('Part 1: ', result);
}

function part2(input) {
  const EXPANSION_TIME = 999999;
  let result = 0;

  // Convert input to 2D array
  let grid = input.map((line) => line.split(''));
  let expansionLinesY = [];
  let expansionLinesX = [];

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].every((char) => char === '.')) {
      expansionLinesY.push(i);
    }
  }

  for (let j = 0; j < grid[0].length; j++) {
    if (grid.every((row) => row[j] === '.')) {
      expansionLinesX.push(j);
    }
  }

  //get all coordinates of # inside an array
  let galaxies = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '#') {
        galaxies.push([i, j]);
      }
    }
  }

  //get difference between coordinates of each pair of galaxies
  let distances = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let expansionCountY = 0;
      let expansionCountX = 0;
      for (let expansionX of expansionLinesX) {
        if (
          (galaxies[i][1] < expansionX && galaxies[j][1] > expansionX) ||
          (galaxies[i][1] > expansionX && galaxies[j][1] < expansionX)
        ) {
          expansionCountX++;
        }
      }
      for (let expansionY of expansionLinesY) {
        if (
          (galaxies[i][0] < expansionY && galaxies[j][0] > expansionY) ||
          (galaxies[i][0] > expansionY && galaxies[j][0] < expansionY)
        ) {
          expansionCountY++;
        }
      }
      distances.push([
        Math.abs(galaxies[i][0] - galaxies[j][0]) + expansionCountY * EXPANSION_TIME,
        Math.abs(galaxies[i][1] - galaxies[j][1]) + expansionCountX * EXPANSION_TIME,
      ]);
    }
  }

  for (let distance of distances) {
    let [x, y] = distance;
    let x_abs = Math.abs(x);
    let y_abs = Math.abs(y);
    result += x_abs + y_abs;
  }

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
