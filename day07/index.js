const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const determineTieBreaker = (handA, handB) => {
  for (let i = 0; i < handA.cards.length; i++) {
    const handAVal = cards.indexOf(handA.cards[i]);
    const handBVal = cards.indexOf(handB.cards[i]);
    if (handAVal !== handBVal) return handBVal - handAVal;
  }
  return 0;
};

function getHandValue(line) {
  const outA = line.cards.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const countsA = Object.values(outA).sort((a, b) => b - a);

  if (countsA[0] === 5) return 6;
  if (countsA[0] === 4) return 5;
  if (countsA[0] === 3 && countsA[1] === 2) return 4;
  if (countsA[0] === 3) return 3;
  if (countsA[0] === 2 && countsA[1] === 2) return 2;
  if (countsA[0] === 2) return 1;
  return 0;
}

const sortTwoHands = (handA, handB) => {
  const handValueA = getHandValue(handA);
  const handValueB = getHandValue(handB);
  if (handValueA > handValueB) return 1; // Hand A wins
  if (handValueB > handValueA) return -1; // Hand b wins
  return determineTieBreaker(handA, handB);
};

function part1(input) {
  let result = 0;
  let hands = input
    .map((line) => {
      const [cards, bid] = line.split(' ');
      return { cards: [...cards], bid: parseInt(bid) };
    })
    .sort(sortTwoHands);

  hands.forEach((hand, i) => (result += (i + 1) * hand.bid));
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
