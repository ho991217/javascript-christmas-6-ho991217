import MenuModel from './MenuModel.js';

/**
 * @typedef {Map<string, number>} Order
 */

class OrderModel {
  constructor() {
    /** @type {Order} */
    this.order = new Map();
  }

  /**
   * 주문을 추가하는 메소드
   * @param {string} name 메뉴 이름
   * @param {number} count 수량
   * @returns {void}
   */
  add(name, count) {
    this.order.set(name, count);
  }

  /**
   * 이름으로 주문을 조회하는 메소드
   *
   * @param {string} name 메뉴 이름
   * @returns {Order} 주문
   */
  get(name) {
    return this.order.get(name);
  }

  /**
   * 카테고리에 해당하는 주문수를 조회하는 메소드
   * @param {string} category 카테고리
   * @returns {number} 주문 수
   */
  countByCategory(category) {
    return Array.from(this.order.entries())
      .filter(([menu]) => MenuModel.getCategoryByName(menu) === category)
      .reduce((prev, [, count]) => prev + count, 0);
  }

  /**
   * 주문 총액을 조회하는 메소드
   * @returns {number} 주문 총액
   */
  getTotalPrice() {
    return Array.from(this.order.entries()).reduce(
      (prev, [menu, count]) => prev + MenuModel.getPriceByName(menu) * count,
      0,
    );
  }

  /**
   * 주문 총수량을 조회하는 메소드
   * @returns {number} 주문 총수량
   */
  getTotalAmount() {
    return Array.from(this.order.values()).reduce((prev, count) => prev + count, 0);
  }

  /**
   * 모든 주문을 조회하는 메소드
   * @returns {Order} 주문
   */
  getAll() {
    return this.order;
  }

  /**
   * 주문 이름 목록을 조회하는 메소드
   * @returns {string[]} 주문 이름 목록
   */
  getNames() {
    return Array.from(this.order.keys());
  }

  /**
   * 주문이 존재하는지 확인하는 메소드
   * @param {string} name 메뉴 이름
   * @returns {boolean} 주문 존재 여부
   */
  isExist(name) {
    return this.order.has(name);
  }

  /**
   * 모든 주문을 삭제하는 메소드
   */
  clear() {
    this.order.clear();
  }
}

export default OrderModel;
