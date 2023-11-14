import { REGEX } from '../../constants/index.js';

/**
 * @typedef {import('../models/MenuModel.js').MenuModel} MenuModel
 */

/**
 * @typedef {Object} OrderModel
 * @property {Map} order
 * @property {function(string, number): void} add 주문을 추가하는 메소드
 * @property {function(string): number} get 주문을 조회하는 메소드
 * @property {function(): Map} getAll 모든 주문을 조회하는 메소드
 * @property {function(string): boolean} isExist 존재하는지 확인하는 메소드
 * @property {function(string): boolean} isTokenizable 토큰화 가능한지 확인하는 메소드
 */

/**
 * @type {OrderModel}
 */
const OrderModel = {
  order: new Map(),

  add(name, count) {
    this.order.set(name, count);
  },

  get(name) {
    return this.order.get(name);
  },

  getAll() {
    return this.order;
  },

  isExist(name) {
    return this.order.has(name);
  },

  isTokenizable(value) {
    return REGEX.TOKENIZABLE_MENU.test(value);
  },
};

export default OrderModel;
