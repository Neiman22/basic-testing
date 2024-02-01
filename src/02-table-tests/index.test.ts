import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 7, b: 8, action: Action.Add, expected: 15 },
    { a: 15, b: 8, action: Action.Subtract, expected: 7 },
    { a: 7, b: 8, action: Action.Multiply, expected: 56 },
    { a: 56, b: 8, action: Action.Divide, expected: 7 },
    { a: 7, b: 3, action: Action.Exponentiate, expected: 343 },
    { a: 7, b: 3, action: 'log', expected: null },
    { a: '7', b: 3, action: Action.Exponentiate, expected: null },
    { a: 7, b: '3', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should result to expected', 
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    }
  );
});
