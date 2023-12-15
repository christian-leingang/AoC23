function getHash(step) {
  let value = 0;
  for (let i = 0; i < step.length; i++) {
    value = ((value + step.charCodeAt(i)) * 17) % 256;

  }
  return value;
}

function part1(steps) {
  let result = 0;
  for (let step of steps) {
    result += getHash(step);
  }
  console.log('Part 1: ', result);
}

function part2(steps) {
  let result = 0;
  let map = new Map( [...Array(256).keys()].map( x => [x, []] ) );
  for(let step of steps) {
    if(step.includes('=')) {
      let [label, focalLength] = step.split('=');
      let hash = getHash(label);
      let arrayAtHash = map.get(hash);
      let itemIndex = arrayAtHash.findIndex(item => item.label === label);

      if (itemIndex !== -1) {
        arrayAtHash[itemIndex] = {focalLength: focalLength, label: label};
      } else {
        arrayAtHash.push({focalLength: focalLength, label: label});
      }
    }
    if(step.endsWith('-')) {
      let label = step.substring(0, step.length - 1);
      let hash = getHash(label);
      let arrayAtHash = map.get(hash);
      arrayAtHash = arrayAtHash.filter(item => !item.label.startsWith(label));
      map.set(hash, arrayAtHash);
    }
  }

  map.forEach((value, key) => {
    if (!value.length) return;
    else result += value.reduce((acc, item, i) => acc + (key + 1) * item.focalLength * (i + 1), 0);
  });

  console.log('Part 2: ', result);
}

export default function run(input) {
  const steps = [...input.replace(/\r/g, '').trim().split(',')];
  part1(steps);
  part2(steps);
}