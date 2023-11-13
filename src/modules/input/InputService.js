import ERROR_MESSAGE from '../../constants/error.js';
import { DATE_RANGE } from '../../constants/number.js';
import InputError from '../../exceptions/InputError.js';

class InputService {
  #inputModel;

  /**
   * @param {InputModel} inputModel
   */
  constructor(inputModel) {
    this.#inputModel = inputModel;
  }

  /**
   * 유효성 검사를 수행하는 메소드
   * @param {string} input
   * @param {'date' | 'menu'} type
   * @returns {string | null}
   */
  validate(input, type) {
    switch (type) {
      case 'date':
        return this.#validateDateInput(input);
      case 'menu':
        return null;
      default:
        return null;
    }
  }

  /**
   * 사용자로부터 입력받은 방문 예정일을 검사하는 메소드
   * @param {string} input
   * @returns {string}
   */
  #validateDateInput(input) {
    if (this.#inputModel.isEmpty(input)) {
      throw new InputError(ERROR_MESSAGE.EMPTY_INPUT);
    }

    if (
      !this.#inputModel.isPositiveInteger(input) ||
      !this.#inputModel.isInRange(input, DATE_RANGE)
    ) {
      throw new InputError(ERROR_MESSAGE.INVALID_DATE);
    }

    return input;
  }
}

export default InputService;
