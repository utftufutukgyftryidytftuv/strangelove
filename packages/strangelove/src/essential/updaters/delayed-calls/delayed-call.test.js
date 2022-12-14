import {expect, describe, it} from '@jest/globals';
import waitTime from "utftu/wait-time.js";
import DelayedCalls from './delayed-calls.js';

describe('delayed calls', () => {
  it('two values', async () => {
    let count = 0;
    const calls = new DelayedCalls((cb) => cb());

    calls.add('1', () => {
      count++;
    });
    calls.add('1', () => {
      count++;
    });
    calls.add('2', () => {
      count++;
    });

    expect(count).toBe(0);
    await waitTime();
    expect(count).toBe(2);
  });
  it('clear old changes', async () => {
    const calls = new DelayedCalls((cb) => cb());
    let a = 0;
    let b = 0;
    calls.add('a', () => a++);
    calls.add('b', () => b++);
    await waitTime();
    expect(a).toBe(1);
    expect(b).toBe(1);
    await waitTime();
    calls.add('a', () => a++);
    await waitTime();
    expect(a).toBe(2);
    expect(b).toBe(1);
  });
});
