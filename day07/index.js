const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const determineTieBreaker = (handA, handB) => {
  for (let i = 0; i < handA.cards.length; i++) {
    const handAVal = cards.indexOf(handA.cards[i]);
    const handBVal = cards.indexOf(handB.cards[i]);
    if (handAVal !== handBVal) return handBVal - handAVal;
  }
  return 0;
};

function getHandValue(line) {
  const out = line.cards.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  let counts = Object.entries(out).sort((a, b) => b[1] - a[1]);
  if (line.cards.every((card) => card === 'J')) return 6;

  if (counts[0][0] === 'J' && counts.length > 1) {
    counts[1][1] += counts[0][1];
    counts = counts.slice(1).sort((a, b) => b[1] - a[1]);
  } else {
    // Find 'J' and add its count to the card with the most occurrences
    const jIndex = counts.findIndex(([card]) => card === 'J');
    if (jIndex !== -1) {
      counts[0][1] += counts[jIndex][1];
      counts = counts.filter((_, index) => index !== jIndex);
    }
  }

  if (counts[0][1] === 5) return 6;
  if (counts[0][1] === 4) return 5;
  if (counts[0][1] === 3 && counts[1][1] === 2) return 4;
  if (counts[0][1] === 3) return 3;
  if (counts[0][1] === 2 && counts[1][1] === 2) return 2;
  if (counts[0][1] === 2) return 1;
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
