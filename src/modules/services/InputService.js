import { ERROR_MESSAGE } from '../../constants/index.js';
import { CATEGORIES } from '../../constants/menu.js';
import { DATE_RANGE } from '../../constants/number.js';
import InputError from '../../exceptions/InputError.js';
import Validator from '../../utils/Validator.js';

/**
 * @typedef {import('../models/DateModel.js').DateModel} DateModel
 * @typedef {import('../models/OrderModel.js').OrderModel} OrderModel
 * @typedef {import('../models/MenuModel.js').MenuModel} MenuModel
 */

class InputService {
  #dateModel;

  #orderModel;

  #menuModel;

  #validator;

  /**
   * @param {DateModel} dateModel
   * @param {OrderModel} orderModel
   * @param {MenuModel} menuModel
   */
  constructor(dateModel, orderModel, menuModel) {
    this.#dateModel = dateModel;
    this.#orderModel = orderModel;
    this.#menuModel = menuModel;
    this.#validator = Validator;
  }

  /**
   * 사용자로부터 입력받은 방문예정일을 검사하는 메소드
   *
   * @method
   * @name processDateInput
   * @param {string} input
   */
  processDateInput(input) {
    this.#validateDateInput(input);
    this.#dateModel.setDate(Number(input));
  }

  /**
   * 사용자로부터 입력받은 주문을 검사하는 메소드
   *
   * @method
   * @name processMenuInput
   * @param {string} input
   */
  processMenuInput(input) {
    this.#validateMenuInput(input);
    const tokenized = input.split(',');

    try {
      tokenized.forEach(this.#fromStringToMenu);
      this.#validateOrders();
    } catch (error) {
      this.#orderModel.clear();
      throw error;
    }
  }

  /**
   * tokenized된 메뉴를 주문에 추가하는 메소드
   *
   * @method
   * @param {string} value
   */
  #fromStringToMenu = (value) => {
    const [name, count] = value.split('-');

    if (!this.#menuModel.isExist(name) || this.#orderModel.isExist(name)) {
      throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
    }

    this.#orderModel.add(name, Number(count));
  };

  /**
   * 사용자로부터 입력받은 방문예정일을 검사하는 메소드
   * 1. 입력이 비어있는지
   * 2. 입력이 양의 정수인지
   * 3. 입력이 범위 내에 있는지
   *
   * @private
   * @method
   * @param {string} input 사용자로부터 입력받은 방문예정일
   * @throws {InputError} 유효하지 않은 방문예정일일 경우
   * @returns {void}
   */
  #validateDateInput(input) {
    if (this.#validator.isEmpty(input)) {
      throw new InputError(ERROR_MESSAGE.EMPTY_INPUT);
    }

    if (
      !this.#validator.isPositiveInteger(input)
      || !this.#validator.isInRange(input, DATE_RANGE)
    ) {
      throw new InputError(ERROR_MESSAGE.INVALID_DATE);
    }
  }

  /**
   * 사용자로부터 입력받은 주문을 검사하는 메소드
   * 1. 주문이 비어있는지
   * 2. 주문이 유효한지
   *
   * @private
   * @method
   * @param {string} input 사용자로부터 입력받은 주문
   * @throws {InputError} 유효하지 않은 주문일 경우
   * @returns {void}
   */
  #validateMenuInput(input) {
    if (this.#validator.isEmpty(input)) {
      throw new InputError(ERROR_MESSAGE.EMPTY_INPUT);
    }

    if (!this.#validator.isTokenizable(input)) {
      throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
    }
  }

  /**
   * 주문이 유효한지 검사하는 메소드
   * 1. 주문 금액이 20만원을 초과하는지
   * 2. 음료만 주문하는지
   *
   * @private
   * @method
   * @throws {InputError} 유효하지 않은 주문일 경우
   * @returns {void}
   */
  #validateOrders() {
    if (
      this.#orderModel.getTotalAmount() > 20
      || this.#orderModel
        .getNames()
        .every((name) => this.#menuModel.getCategoryByName(name) === CATEGORIES.drinks)
    ) {
      throw new InputError(ERROR_MESSAGE.INVALID_ORDER);
    }
  }
}

export default InputService;
