import runCb from '../run-cb/run-cb.js';
import ReadValueAsync from '../../value/async/read-value-async.js';

const updateTimeKey = Symbol('update time');

async function selectAsyncInners({cb, value, parents, createAtom}) {
  const atom = createAtom({
    value: new ReadValueAsync({
      async get() {
        const startDate = Date.now();
        atom[updateTimeKey] = startDate;
        const {value, parents} = runCb(cb);
        await value;

        if (atom[updateTimeKey] > startDate) {
          return;
        }

        atom.relations.replaceParents(parents);

        return value;
      },
    }),
  });

  const syncValue = await value;
  atom.value.setCache(syncValue);
  atom.relations.replaceParents(parents);
  return atom;
}

export default selectAsyncInners;
