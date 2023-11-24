import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getInput(dayPath, isTest) {
  const fileName = isTest ? 'input_test.txt' : 'input.txt';
  return readFileSync(resolve(dayPath, fileName), {
    encoding: 'utf-8',
  });
}
