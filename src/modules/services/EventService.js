import { CATEGORIES } from '../../constants/menu.js';
import Format from '../../utils/Format.js';

/**
 * @typedef {import('../models/EventModel').EventModel} EventModel
 * @typedef {import('../models/OrderModel').OrderModel} OrderModel
 * @typedef {import('../models/MenuModel').MenuModel} MenuModel
 * @typedef {import('../models/DateModel').DateModel} DateModel
 */

/**
 * @typedef {Object} EventService
 * @property {Function} getGift
 * @property {function(): {name: string, value: number}} getBenfitList
 */

/**
 * @type {EventService}
 */
class EventService {
  #orderModel;

  #eventModel;

  /**
   * @param {OrderModel} orderModel
   * @param {EventModel} eventModel
   */
  constructor(orderModel, eventModel) {
    this.#orderModel = orderModel;
    this.#eventModel = eventModel;
  }

  getGift() {
    const giftPrice = this.#eventModel.getGift();
    if (giftPrice > 0) return Format.menuWithCount('샴페인', 1);
    return '없음';
  }

  getBenfitList() {
    const totalPrice = this.#orderModel.getTotalPrice();
    if (totalPrice < 10_000) return [];
    return [
      this.#eventModel.getChristmasDdayDiscount(),
      this.#eventModel.getWeekdayDiscount(this.#orderModel.countByCategory(CATEGORIES.desserts)),
      this.#eventModel.getWeekendDiscount(this.#orderModel.countByCategory(CATEGORIES.main)),
      this.#eventModel.getSpecialDiscount(),
      this.#eventModel.getGift(totalPrice),
    ].filter(({ value }) => value !== 0);
  }

  getTotalBenfitPrice() {
    const benfitList = this.getBenfitList();
    const totalBenfitPrice = benfitList.reduce((total, { value }) => total + value, 0);

    return totalBenfitPrice;
  }

  getTotalPriceAfterDiscount() {
    const totalPriceBeforeDiscount = this.#orderModel.getTotalPrice();
    const totalBenfitPrice = this.getBenfitList()
      .filter(({ name }) => name !== '증정 이벤트')
      .reduce((total, { value }) => total + value, 0);
    const totalPriceAfterDiscount = totalPriceBeforeDiscount - totalBenfitPrice;

    return totalPriceAfterDiscount;
  }

  getBadge() {
    const totalPriceAfterDiscount = this.getTotalPriceAfterDiscount();

    if (totalPriceAfterDiscount >= 20_000) return '산타';
    if (totalPriceAfterDiscount >= 10_000) return '트리';
    if (totalPriceAfterDiscount >= 5_000) return '별';
    return null;
  }
}

export default EventService;
