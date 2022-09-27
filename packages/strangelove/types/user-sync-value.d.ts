import {SyncUserAtom} from './user-atom';

interface Config<TValue> {
  get(): TValue;
  set(value: TValue);
  value: TValue;
  needCheckPrev?: boolean;
}

export declare const createSyncStore: <TValue>(
  config: Config<TValue>
) => SyncUserAtom<TValue>;
