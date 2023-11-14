import Format from '../../utils/Format.js';

/**
 * @typedef {import('../models/DateModel').DateModel} DateModel
 * @typedef {import('../models/OrderModel').OrderModel} OrderModel
 * @typedef {import('../models/MenuModel').MenuModel} MenuModel
 */

/**
 * @typedef {Object} OutputService
 * @property {function(): string} getOrderedMenuList
 */

class OutputService {
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

  getOrderedMenuList() {
    const orderedMenuList = Array.from(this.#orderModel.order.entries());
    return orderedMenuList.map(([menu, count]) => Format.menuWithCount(menu, count));
  }

  getTotalPriceBeforeDiscount() {
    const order = Array.from(this.#orderModel.getAll().entries());
    const totalPriceBeforeDiscount = order.reduce(
      (totalPrice, [menu, count]) => totalPrice + this.#menuModel.getPriceByName(menu) * count,
      0
    );

    return totalPriceBeforeDiscount;
  }
}

export default OutputService;
