import ERROR_MESSAGE from '../../constants/error.js';
import { DATE_RANGE } from '../../constants/number.js';
import InputError from '../../exceptions/InputError.js';

/**
 * @typedef {import('./InputModel.js').InputModel} InputModel
 */

class InputService {
  #inputModel;

  /**
   * @param {InputModel} inputModel
   */
  constructor(inputModel) {
    this.#inputModel = inputModel;
  }

  /**
   * 사용자의 입력을 검증하는 메소드
   *
   * @method
   * @name validate
   * @param {string} input
   * @param {'date' | 'menu'} type
   * @returns {string}
   */
  validate(input, type) {
    if (this.#inputModel.isEmpty(input)) {
      throw new InputError(ERROR_MESSAGE.EMPTY_INPUT);
    }

    switch (type) {
      case 'date':
        return this.#validateDateInput(input);
      case 'menu':
        return this.#validateMenuInput(input);
      default:
        return '';
    }
  }

  /**
   * 사용자로부터 입력받은 방문예정일을 검사하는 메소드
   *
   * @private
   * @method
   * @name #validateDateInput
   * @param {string} input
   * @returns {string}
   */
  #validateDateInput(input) {
    if (
      !this.#inputModel.isPositiveInteger(input) ||
      !this.#inputModel.isInRange(input, DATE_RANGE)
    ) {
      throw new InputError(ERROR_MESSAGE.INVALID_DATE);
    }

    return input;
  }

  /**
   * 사용자로부터 입력받은 메뉴를 검사하는 메소드
   *
   * @private
   * @method
   * @name #validateMenuInput
   * @param {string} input
   * @returns {string}
   */
  #validateMenuInput(input) {
    // TODO: 메뉴 입력 유효성 검사
    return input;
  }
}

export default InputService;
