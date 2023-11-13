import { Console } from '@woowacourse/mission-utils';
import PROMPT from '../../constants/prompt.js';

const InputView = {
  async readDate() {
    const input = await this.readInputAfterPrompt(PROMPT.ASK_DATE);

    return input;
  },

  async readInputAfterPrompt(prompt) {
    return Console.readLineAsync(`${prompt}\n`);
  },
};

export default InputView;
