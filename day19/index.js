function evaluateExpression(variable, operator, number, ranking) {
  switch (operator) {
    case '<':
      return ranking[variable] < Number(number);
    case '>':
      return ranking[variable] > Number(number);
  }
}

function part1(workflows, rankings) {
  let result = 0;
  const workflowsList = new Map(
    workflows.split('\n').map((item) => {
      let [key, rest] = item.split('{');
      rest = rest
        .replace('}', '')
        .split(',')
        .map((value) => {
          let [cond, res] = value.includes(':') ? value.split(':') : ['', value];
          return { cond: cond || '', res: res || '' };
        });
      return [key, rest];
    })
  );

  const rankingsList = rankings.split('\n').map((item) =>
    item.match(/(\w+=\d+)/g).reduce((acc, pair) => {
      let [key, value] = pair.split('=');
      acc[key] = +value;
      return acc;
    }, {})
  );

  let accepted = new Set();

  rankingsList.forEach((ranking) => {
    let workflow = workflowsList.get('in');
    let found = false;
    while (!found) {
      for (let item of workflow) {
        if (item.cond === '') {
          if (item.res === 'R') return;
          if (item.res === 'A') {
            accepted.add(ranking);
            return;
          }
          workflow = workflowsList.get(item.res);
          break;
        }
        const [variable, operator, number] = item.cond.match(/([a-zA-Z]+)([<>])(\d+)/).slice(1);
        found = evaluateExpression(variable, operator, number, ranking);

        if (found) {
          if (item.res === 'A') {
            accepted.add(ranking);
            return;
          }
          if (item.res === 'R') return;

          workflow = workflowsList.get(item.res);
          found = false;
          break;
        } else {
          continue;
        }
      }
    }
  });

  accepted.forEach((item) => {
    result += item.x + item.m + item.a + item.s;
  });

  console.log('Part 1: ', result);
}

export default function run(input) {
  const [workflows, rankings] = [...input.replace(/\r/g, '').trim().split('\n\n')];
  part1(workflows, rankings);
}
