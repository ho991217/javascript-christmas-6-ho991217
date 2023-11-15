import { ERROR_MESSAGE } from '../../constants/index.js';
import { DATE_RANGE } from '../../constants/number.js';
import InputError from '../../exceptions/InputError.js';
import Validator from '../../utils/Validator.js';

/**
 * @typedef {import('../models/DateModel.js').DateModel} DateModel
 * @typedef {import('../models/OrderModel.js').OrderModel} OrderModel
 * @typedef {import('../models/MenuModel.js').MenuModel} MenuModel
 */

/**
 * @typedef {Object} InputService
 * @property {function(string): void} processDateInput
 * @property {function(string): void} processMenuInput
 */

class InputService {
  #dateModel;

  #orderModel;

  #menuModel;

  /**
   * @param {DateModel} dateModel
   * @param {OrderModel} orderModel
   * @param {MenuModel} menuModel
   */
  constructor(dateModel, orderModel, menuModel) {
    this.#dateModel = dateModel;
    this.#orderModel = orderModel;
    this.#menuModel = menuModel;
  }

  /**
   * 사용자로부터 입력받은 방문예정일을 검사하는 메소드
   *
   * @private
   * @method
   * @name #processDateInput
   * @param {string} input
   * @returns {string}
   */
  processDateInput(input) {
    this.#validateDateInput(input);
    this.#dateModel.setDate(Number(input));
  }

  /**
   * 사용자로부터 입력받은 메뉴를 검사하는 메소드
   *
   * @private
   * @method
   * @name #processMenuInput
   * @param {string} input
   * @returns {string}
   */
  processMenuInput(input) {
    this.#validateMenuInput(input);
    const tokenized = input.split(',');

    try {
      tokenized.forEach(this.#fromStringToMenu);
      if (this.#orderModel.getTotalAmount() > 20) throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
    } catch (error) {
      this.#orderModel.clear();
      throw error;
    }
  }

  #fromStringToMenu = (value) => {
    const [name, count] = value.split('-');

    if (!this.#menuModel.isExist(name) || this.#orderModel.isExist(name)) {
      throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
    }

    this.#orderModel.add(name, Number(count));
  };

  #validateDateInput(input) {
    if (Validator.isEmpty(input)) {
      throw new InputError(ERROR_MESSAGE.EMPTY_INPUT);
    }
    if (!Validator.isPositiveInteger(input) || !Validator.isInRange(input, DATE_RANGE)) {
      throw new InputError(ERROR_MESSAGE.INVALID_DATE);
    }
  }

  #validateMenuInput(input) {
    if (Validator.isEmpty(input)) throw new InputError(ERROR_MESSAGE.EMPTY_INPUT);
    if (!Validator.isTokenizable(input)) throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
  }
}

export default InputService;
