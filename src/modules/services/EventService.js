/* eslint-disable comma-dangle */
import { GIFT_EVENT_CONDITION } from '../../constants/number.js';
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
    const formatted = this.#eventModel
      .getAppliedEventList()
      .map(([name, value]) => Format.benfit(name, value));

    if (formatted.length === 0) return ['없음'];
    return formatted;
  }
}

export default EventService;
