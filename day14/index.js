function part1(input) {
  let result = 0;
  let platform = input.map((line) => line.split(''));
  let changed = true;
  while (changed) {
    changed = false;
    for (let y = 1; y < platform.length; y++) {
      for (let x = 0; x < platform[0].length; x++) {
        if (platform[y - 1][x] === '.' && platform[y][x] === 'O') {
          platform[y][x] = '.';
          platform[y - 1][x] = 'O';
          changed = true;
        }
      }
    }
  }

  for (let y = 0; y < platform.length; y++) {
    for (let x = 0; x < platform[0].length; x++) {
      if (platform[y][x] === 'O') {
        result += platform.length - y;
      }
    }
  }
  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;
  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
