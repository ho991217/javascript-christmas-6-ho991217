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
    const totalPrice = this.#orderModel.getTotalPrice();
    if (totalPrice < 10_000) return [];
    return [
      ['크리스마스 디데이 할인', this.#eventModel.getChristmasDdayDiscount()],
      [
        '평일 할인',
        this.#eventModel.getWeekdayDiscount(this.#orderModel.countByCategory(CATEGORIES.desserts)),
      ],
      [
        '주말 할인',
        this.#eventModel.getWeekendDiscount(this.#orderModel.countByCategory(CATEGORIES.main)),
      ],
      ['특별 할인', this.#eventModel.getSpecialDiscount()],
      ['증정 이벤트', this.#eventModel.getGift(totalPrice)],
    ].filter(([, value]) => value !== 0);
  }

  getTotalBenfitPrice() {
    const benfitList = this.getBenfitList();
    const totalBenfitPrice = benfitList.reduce((total, [, price]) => total + price, 0);

    return totalBenfitPrice;
  }

  getTotalPriceAfterDiscount() {
    const totalPriceBeforeDiscount = this.#orderModel.getTotalPrice();
    const totalBenfitPrice = this.getBenfitList()
      .filter(([event]) => event !== '증정 이벤트')
      .reduce((total, [, price]) => total + price, 0);
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
