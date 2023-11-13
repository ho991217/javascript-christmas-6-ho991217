import { Console } from '@woowacourse/mission-utils';
import PROMPT from '../../constants/prompt.js';

const InputView = {
  /**
   * 날짜 입력 프롬프트를 출력하고 사용자로부터 입력을 받는 메소드
   * @returns {Promise<string>}
   */
  async readDate() {
    const input = await this.readInputAfterPrompt(PROMPT.ASK_DATE);
    return input;
  },

  /**
   * 메뉴 입력 프롬프트를 출력하고 사용자로부터 입력을 받는 메소드
   * @returns {Promise<string>}
   */
  async readMenu() {
    const input = await this.readInputAfterPrompt(PROMPT.ASK_MENU);
    return input;
  },

  /**
   * 프롬프트 뒤에 줄바꿈을 추가하여 입력을 받는 메소드
   * @param {string} prompt
   * @returns {Promise<string>}
   */
  async readInputAfterPrompt(prompt) {
    return Console.readLineAsync(`${prompt}\n`);
  },
};

export default InputView;
