import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 8, action: Action.Add });
    expect(result).toBe(15);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 15, b: 8, action: Action.Subtract });
    expect(result).toBe(7);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 8, action: Action.Multiply });
    expect(result).toBe(56);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 56, b: 8, action: Action.Divide });
    expect(result).toBe(7);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 3, action: Action.Exponentiate });
    expect(result).toBe(343);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 7, b: 3, action: 'log' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: '7', b: 3, action: Action.Exponentiate });
    const result2 = simpleCalculator({ a: 7, b: '3', action: Action.Exponentiate });
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });
});
