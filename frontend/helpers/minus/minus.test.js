import { describe, test, expect } from 'vitest';
import { minus } from './minus';

describe('minus', () => {
  test('positive', () => {
    expect(minus(5, 5)).toBe(0);
  });
});