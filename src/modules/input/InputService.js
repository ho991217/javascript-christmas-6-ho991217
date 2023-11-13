import ERROR_MESSAGE from '../../constants/error.js';
import CustomError from '../error/CustomError.js';

class InputService {
  #inputModel;

  constructor(inputModel) {
    this.#inputModel = inputModel;
  }

  /**
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

  #validateDateInput(input) {
    if (this.#inputModel.isEmpty(input)) {
      throw new CustomError(ERROR_MESSAGE.EMPTY_INPUT);
    }
    if (!this.#inputModel.isPositiveInteger(input)) {
      throw new CustomError('Input must be an integer.');
    }

    return input;
  }
}

export default InputService;
