const maxCubes = { red: 12, green: 13, blue: 14 };

function playGame(line) {
  const sets = line.split(':')[1].trim().split(';');
  for (let set of sets) {
    const cubes = set.split(',');
    for (let cube of cubes) {
      const [count, color] = cube.trim().split(' ');
      if (maxCubes[color] < +count) {
        return false;
      }
    }
  }
  return true;
}

function part1(input) {
  let result = 0;
  for (const [i, value] of input.entries()) {
    if (playGame(value)) result += i + 1;
  }
  console.log('Part 1: ', result);
}

function playGameMinCubes(line) {
  let curCubes = { red: 0, green: 0, blue: 0 };

  const sets = line.split(':')[1].trim().split(';');
  for (let set of sets) {
    const cubes = set.split(',');
    for (let cube of cubes) {
      let [count, color] = cube.trim().split(' ');
      count = +count;

      if (curCubes[color] < count) curCubes[color] = count;
    }
  }
  return curCubes.red * curCubes.green * curCubes.blue;
}

function part2(input) {
  let result = 0;
  for (const line of input) {
    result += playGameMinCubes(line);
  }
  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
