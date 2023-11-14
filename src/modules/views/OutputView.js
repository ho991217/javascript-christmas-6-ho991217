import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../../constants/index.js';

const OutputView = {
  greet() {
    Console.print(MESSAGE.GREETING);
  },

  previewBenfit() {
    Console.print(MESSAGE.PREVIEW_BENEFIT);
  }

  printAndLineBreak(message) {
    Console.print(message);
    Console.print();
  },
};

export default OutputView;
