import { Console } from '@woowacourse/mission-utils';
import PROMPT from '../../constants/prompt.js';

const InputView = {
  /**
   * @returns {Promise<string>}
   */
  async readDate() {
    const input = await this.readInputAfterPrompt(PROMPT.ASK_DATE);

    return input;
  },

  /**
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async readInputAfterPrompt(prompt) {
    return Console.readLineAsync(`${prompt}\n`);
  },
};

export default InputView;
