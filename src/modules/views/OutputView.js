import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../../constants/index.js';
import Format from '../../utils/Format.js';

/**
 * @typedef {Object} OutputView
 * @property {function} greet
 * @property {function} previewBenefit
 * @property {function(string, ...string)} printWithTitle
 * @property {function(string)} printEmptyWithTitle
 * @property {function} printAndLineBreak
 */

/**
 * @type {OutputView}
 */
const OutputView = {
  greet() {
    Console.print(MESSAGE.GREETING);
  },

  previewBenefit(date) {
    this.printAndLineBreak(MESSAGE.PREVIEW_BENEFIT(date));
  },

  printWithTitle(title, ...messages) {
    Console.print(Format.title(title));
    messages.slice(0, -1).forEach((message) => Console.print(message));
    this.printAndLineBreak(messages.at(-1));
  },

  printEmptyWithTitle(title) {
    Console.print(Format.title(title));
    this.printAndLineBreak(MESSAGE.EMPTY_VALUE);
  },

  printAndLineBreak(message) {
    Console.print(message);
    Console.print('');
  },
};

export default Object.freeze(OutputView);
