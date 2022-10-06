import {describe, expect, it, jest} from '@jest/globals';
import {createSyncStore, ReadSync, ReadWriteSync} from './sync.js';

describe('value sync', () => {
  it('init not call', () => {
    const get = jest.fn();
    new ReadSync({
      get,
    });
    expect(get.mock.calls.length).toBe(0);
  });
  it('update() calls get()', () => {
    const get = jest.fn();
    const atom = new ReadSync({
      get,
    });
    expect(get.mock.calls.length).toBe(0);
    atom.update();
    expect(get.mock.calls.length).toBe(1);
  });
  it('cache value', () => {
    const get = jest.fn(() => 'foo');
    const value = new ReadSync({
      get,
    });

    value.get();
    expect(value.value).toBe('foo');
    value.get();
    expect(get.mock.calls.length).toBe(1);
  });
  describe('createSyncStore()', () => {
    it('read', () => {
      const store = createSyncStore({
        get: () => {},
      });
      expect(store instanceof ReadSync).toBe(true);
    });
    it('write', () => {
      const store = createSyncStore({
        get: () => {},
        set: () => {},
      });
      expect(store instanceof ReadWriteSync).toBe(true);
    });
  });

  describe('set()', () => {
    it('not updated', () => {
      const set = jest.fn();
      const valueStore = new ReadWriteSync(
        {set},
        {
          value: 'hello',
          needCheckPrev: true,
        }
      );
      const setResult = valueStore.set('hello');
      expect(setResult).toBe(false);
      expect(set.mock.calls.length).toBe(0);
    });
    it('updated', () => {
      const set = jest.fn();
      const valueStore = new ReadWriteSync(
        {set},
        {
          value: 'hello',
          needCheckPrev: true,
        }
      );
      const setResult = valueStore.set('hello-new');
      expect(setResult).toBe(true);
      expect(set.mock.calls.length).toBe(1);
      expect(set.mock.calls[0][0]).toBe('hello-new');
    });
  });
});
