/* eslint-disable comma-dangle */
import Format from '../../utils/Format.js';

/**
 * @typedef {import('../models/EventModel').EventModel} EventModel
 * @typedef {import('../models/OrderModel').OrderModel} OrderModel
 * @typedef {import('../models/MenuModel').MenuModel} MenuModel
 * @typedef {import('../models/DateModel').DateModel} DateModel
 */

/**
 * @typedef {Object} EventService
 */

/**
 * @type {EventService}
 */
class EventService {
  #dateModel;

  #orderModel;

  #menuModel;

  #eventModel;

  /**
   * @param {DateModel} dateModel
   * @param {OrderModel} orderModel
   * @param {MenuModel} menuModel
   * @param {EventModel} eventModel
   */
  constructor(dateModel, orderModel, menuModel, eventModel) {
    this.#dateModel = dateModel;
    this.#orderModel = orderModel;
    this.#menuModel = menuModel;
    this.#eventModel = eventModel;
  }

  getGift() {
    const giftPrice = this.#eventModel.getGift();
    if (giftPrice > 0) return Format.menuWithCount('샴페인', 1);
    return '없음';
  }

  getBenfitList() {
    if (this.#orderModel.getTotalPrice() < 10_000) return [];
    return [
      ['크리스마스 디데이 할인', this.#eventModel.getChristmasDdayDiscount()],
      ['평일 할인', this.#eventModel.getWeekdayDiscount()],
      ['주말 할인', this.#eventModel.getWeekendDiscount()],
      ['특별 할인', this.#eventModel.getSpecialDiscount()],
      ['증정 이벤트', this.#eventModel.getGift()],
    ].filter(([, value]) => value !== 0);
  }

  getTotalBenfitPrice() {
    const benfitList = this.getBenfitList();
    const totalBenfitPrice = benfitList.reduce((total, [, price]) => total + price, 0);

    return totalBenfitPrice;
  }

  getTotalPriceAfterDiscount() {
    const totalPriceBeforeDiscount = this.#orderModel.getTotalPrice();
    const totalBenfitPrice = this.getTotalBenfitPrice();
    const totalPriceAfterDiscount = totalPriceBeforeDiscount - totalBenfitPrice;

    return totalPriceAfterDiscount;
  }
}

export default EventService;
