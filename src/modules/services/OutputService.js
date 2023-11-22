import Format from '../../utils/Format.js';

/**
 * @typedef {import('../models/DateModel').DateModel} DateModel
 * @typedef {import('../models/OrderModel').OrderModel} OrderModel
 * @typedef {import('../models/MenuModel').MenuModel} MenuModel
 */

class OutputService {
  #orderModel;

  #menuModel;

  /**
   * @param {OrderModel} orderModel
   * @param {MenuModel} menuModel
   */
  constructor(orderModel, menuModel) {
    this.#orderModel = orderModel;
    this.#menuModel = menuModel;
  }

  /**
   * 주문한 메뉴와 수량을 `${메뉴} ${수량}개` 형태로 반환한다.
   *
   * @method
   * @returns {string[]}
   */
  getOrderedMenuList() {
    const orderedMenuList = Array.from(this.#orderModel.order.entries());
    return orderedMenuList.map(([menu, count]) => Format.menuWithCount(menu, count));
  }

  /**
   * 할인 적용 전 총 결제 금액을 number형태로 반환한다.
   *
   * @method
   * @returns {number}
   */
  getTotalPriceBeforeDiscount() {
    const order = Array.from(this.#orderModel.getAll().entries());
    const totalPriceBeforeDiscount = order.reduce(
      (totalPrice, [menu, count]) => totalPrice + this.#menuModel.getPriceByName(menu) * count,
      0,
    );

    return totalPriceBeforeDiscount;
  }
}

export default OutputService;
