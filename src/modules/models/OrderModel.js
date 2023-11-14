import MenuModel from './MenuModel.js';

/**
 * @typedef {Object} OrderModel
 * @property {Map} order
 * @property {function(string, number): void} add 주문을 추가하는 메소드
 * @property {function(string): number} get 주문을 조회하는 메소드
 * @property {function(string): number} countByCategory 카테고리별 주문 개수를 조회하는 메소드
 * @property {function(): Map} getAll 모든 주문을 조회하는 메소드
 * @property {function(string): boolean} isExist 존재하는지 확인하는 메소드
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

  countByCategory(category) {
    return Array.from(this.order.entries())
      .filter(([menu]) => MenuModel.getCategoryByName(menu) === category)
      .reduce((prev, [, count]) => prev + count, 0);
  },

  getTotalPrice() {
    return Array.from(this.order.entries()).reduce(
      (prev, [menu, count]) => prev + MenuModel.getPriceByName(menu) * count,
      0
    );
  },

  getAll() {
    return this.order;
  },

  isExist(name) {
    return this.order.has(name);
  },
};

export default OrderModel;
