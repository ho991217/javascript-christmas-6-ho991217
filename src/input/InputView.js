import { Console } from '@woowacourse/mission-utils';
import PROMPT from '../constants/prompt';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(PROMPT.ASK_DATE);

    return input;
  },
};

export default InputView;
