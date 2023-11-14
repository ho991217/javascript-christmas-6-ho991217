import { ERROR_MESSAGE } from '../../constants/index.js';
import { DATE_RANGE } from '../../constants/number.js';
import InputError from '../../exceptions/InputError.js';

/**
 * @typedef {import('../models/DateModel.js').DateModel} DateModel
 * @typedef {import('../models/OrderModel.js').OrderModel} OrderModel
 * @typedef {import('../models/MenuModel.js').MenuModel} MenuModel
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
   * 사용자의 입력을 검증하는 메소드
   *
   * @method
   * @name process
   * @param {string} input
   * @param {'date' | 'menu'} type
   * @returns {string}
   */
  process(input, type) {
    if (this.#dateModel.isEmpty(input)) {
      throw new InputError(ERROR_MESSAGE.EMPTY_INPUT);
    }

    switch (type) {
      case 'date':
        return this.#processDateInput(input);
      case 'menu':
        return this.#processMenuInput(input);
      default:
        return '';
    }
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
  #processDateInput(input) {
    if (
      !this.#dateModel.isPositiveInteger(input) ||
      !this.#dateModel.isInRange(input, DATE_RANGE)
    ) {
      throw new InputError(ERROR_MESSAGE.INVALID_DATE);
    }

    return Number(input);
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
  #processMenuInput(input) {
    if (!this.#orderModel.isTokenizable(input)) {
      throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
    }
    const tokenized = input.split(',');
    tokenized.forEach(this.#fromStringToMenu);

    return this.#orderModel.getAll();
  }

  #fromStringToMenu = (value) => {
    const [name, count] = value.split('-');

    if (!this.#menuModel.isExist(name) || this.#orderModel.isExist(name)) {
      throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
    }

    this.#orderModel.add(name, Number(count));
  };
}

export default InputService;
