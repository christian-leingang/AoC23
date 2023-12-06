const getNumbersOfString = (str) => (str.match(/\d+/g) || []).map(Number);

const getFullNumberOfString = (str) => [+str.replace(/\D/g, '')];

function runRace(times, distances) {
  let product = 1;
  for (let raceId = 0; raceId < times.length; raceId++) {
    let recordBreakerCount = 0;
    for (let duration = 0; duration < times[raceId]; duration++) {
      const travelTime = times[raceId] - duration;
      if (duration * travelTime > distances[raceId]) recordBreakerCount++;
    }
    product *= recordBreakerCount;
  }
  return product;
}

function part1(input) {
  const times = getNumbersOfString(input[0]);
  const distances = getNumbersOfString(input[1]);
  console.log('Part 1: ', runRace(times, distances));
}

function part2(input) {
  const times = getFullNumberOfString(input[0]);
  const distances = getFullNumberOfString(input[1]);
  console.log('Part 2: ', runRace(times, distances));
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
