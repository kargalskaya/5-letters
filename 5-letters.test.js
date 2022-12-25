import { FiveLetters } from "./5-letters";

const fiveLetters = new FiveLetters('буква');

describe('FiveLetters should', () => {
  test('return "буква"', () => {
    expect(fiveLetters.getWord()).toBe('буква');
  });
});