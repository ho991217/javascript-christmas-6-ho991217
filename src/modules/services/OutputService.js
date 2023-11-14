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
    const orderedMenuList = Array.from(this.#orderModel.order.entries()).map(
      ([menu, count]) => `${menu} - ${count}개`,
    );
    return orderedMenuList;
  }
}

export default OutputService;
