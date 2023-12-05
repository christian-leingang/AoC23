function getLowestLocation(input, seedsArr) {
  const maps = new Map();
  let currentMapIndex = 1;

  for (const line of input.slice(2)) {
    if (/\d/.test(line)) {
      const numbers = line.split(' ').map(Number);
      const [destStart, sourceStart, length] = numbers;
      if (!maps.has(currentMapIndex)) {
        maps.set(currentMapIndex, []);
      }
      maps.get(currentMapIndex).push({ destStart, sourceStart, length });
    } else if (line.trim() === '') {
      currentMapIndex++;
    }
  }

  let lowestLocation = 9999999999999;
  for (const seedList of seedsArr) {
    for (let mapIdx = 1; mapIdx <= maps.size; mapIdx++) {
      const seed = seedList.at(-1);
      const curMap = maps.get(mapIdx);
      for (const map of curMap) {
        const { destStart, sourceStart, length } = map;
        if (seed >= sourceStart && seed <= sourceStart + length) {
          seedList.push(destStart - sourceStart + seed);
          break;
        }
      }
    }
    if (seedList.at(-1) < lowestLocation) {
      lowestLocation = seedList.at(-1);
    }
  }
  return lowestLocation;
}

function part1(input) {
  let result = 0;
  const seedsArr = input[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((el) => [+el]);

  console.log(seedsArr);
  result = getLowestLocation(input, seedsArr);
  console.log('Part 1: ', result);
}

function part2(input) {
  let lowestLocation = 9999999999999;
  const seeds = input[0].split(':')[1].trim().split(' ');

  let seedsArr = [];
  for (let seedsIdx = 0; seedsIdx < seeds.length; seedsIdx += 2) {
    const curSeedStart = +seeds[seedsIdx];
    console.log(curSeedStart);
    for (let i = 0; i < seeds[seedsIdx + 1]; i++) {
      seedsArr.push([curSeedStart + i]);
      let location = getLowestLocation(input, seedsArr);
      if (location < lowestLocation) {
        lowestLocation = location;
      }
      seedsArr.pop();
    }
    console.log('Current lowest location: ', lowestLocation);
  }

  console.log('Part 2: ', lowestLocation);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
