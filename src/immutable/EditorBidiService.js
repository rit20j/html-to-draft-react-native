const UnicodeBidiService = require("./UnicodeBidiService.js");
const Immutable = require('immutable');
const nullthrows = require('nullthrows');

const { OrderedMap } = Immutable;

let bidiService;

const EditorBidiService = {
  getDirectionMap(content, prevBidiMap) {
    if (!bidiService) {
      bidiService = new UnicodeBidiService();
    } else {
      bidiService.reset();
    }

    const blockMap = content.getBlockMap();
    const nextBidi = blockMap.valueSeq().map(block => nullthrows(bidiService.getDirection(block.getText())));
    const bidiMap = OrderedMap(blockMap.keySeq().zip(nextBidi));

    if (prevBidiMap != null && Immutable.is(prevBidiMap, bidiMap)) {
      return prevBidiMap;
    }

    return bidiMap;
  },
};

module.exports = EditorBidiService;
