import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../../constants/index.js';

/**
 * @typedef {Object} OutputView
 * @property {function} greet
 * @property {function} previewBenfit
 * @property {function} printAndLineBreak
 */

const OutputView = {
  greet() {
    Console.print(MESSAGE.GREETING);
  },

  previewBenfit() {
    this.printAndLineBreak(MESSAGE.PREVIEW_BENEFIT);
  },

  printAndLineBreak(message) {
    Console.print(message);
    Console.print();
  },
};

export default OutputView;
