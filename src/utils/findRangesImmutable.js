// const { List } = require('immutable');

const Immutable = require('immutable');
const { List, Map, OrderedSet, Record, Repeat } = Immutable;
/**
 * Search through an array to find contiguous stretches of elements that
 * match a specified filter function.
 * When ranges are found, execute a specified `found` function to supply
 * the values to the caller.
 */
function findRangesImmutable(
  haystack,
  areEqualFn,
  filterFn,
  foundFn,
) {
  if (!haystack.size) {
    return;
  }

  let cursor = 0;

  haystack.reduce((value, nextValue, nextIndex) => {
    if (!areEqualFn(value, nextValue)) {
      if (filterFn(value)) {
        foundFn(cursor, nextIndex);
      }
      cursor = nextIndex;
    }
    return nextValue;
  });

  filterFn(haystack.last()) && foundFn(cursor, haystack.count());
}

module.exports = findRangesImmutable
// module.exports = findRangesImmutable;