import { Console } from '@woowacourse/mission-utils';
import PROMPT from '../../constants/prompt.js';

/**
 * @typedef {Object} InputView
 * @property {function(): Promise<string>} readDate 날짜 입력 프롬프트를 출력하고 사용자로부터 입력을 받는 메소드
 * @property {function(): Promise<string>} readMenu 메뉴 입력 프롬프트를 출력하고 사용자로부터 입력을 받는 메소드
 * @property {function(string): Promise<string>} readInputAfterPrompt 줄바꿈을 추가하여 입력을 받는 메소드
 */

/**
 * @type {InputView}
 */
const InputView = {
  async readDate() {
    const input = await this.readInputAfterPrompt(PROMPT.ASK_DATE);
    return input;
  },

  async readMenu() {
    const input = await this.readInputAfterPrompt(PROMPT.ASK_MENU);
    return input;
  },

  async readInputAfterPrompt(prompt) {
    return Console.readLineAsync(`${prompt}\n`);
  },
};

export default InputView;
