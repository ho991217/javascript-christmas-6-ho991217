import EVENT from '../../constants/event.js';
import { CATEGORIES } from '../../constants/menu.js';
import { BADGE_CONDITION } from '../../constants/number.js';
import Format from '../../utils/Format.js';

/**
 * @typedef {import('../models/EventModel').EventModel} EventModel
 * @typedef {import('../models/OrderModel').OrderModel} OrderModel
 * @typedef {import('../models/DateModel').DateModel} DateModel
 */

class EventService {
  #dateModel;

  #orderModel;

  #eventModel;

  /**
   * @param {DateModel} dateModel
   * @param {OrderModel} orderModel
   * @param {EventModel} eventModel
   */
  constructor(dateModel, orderModel, eventModel) {
    this.#dateModel = dateModel;
    this.#orderModel = orderModel;
    this.#eventModel = eventModel;
  }

  /**
   * 증정품을 반환하는 메소드
   *
   * @method
   * @returns {'샴페인 1개' | '없음'}
   */
  getGift() {
    const giftPrice = this.#eventModel.getGift();
    if (giftPrice > 0) return Format.menuWithCount('샴페인', 1);
    return '없음';
  }

  /**
   * 이벤트 종류와 금액을 반환하는 메소드
   *
   * @method
   * @returns {Array<{name: string, value: number}>}
   */
  getBenfitList() {
    const totalPrice = this.#orderModel.getTotalPrice();
    if (totalPrice < 10_000) return [];
    return [
      this.#eventModel.getChristmasDdayDiscount(this.#dateModel.getDate()),
      this.#eventModel.getWeekdayDiscount(this.#orderModel.countByCategory(CATEGORIES.desserts)),
      this.#eventModel.getWeekendDiscount(this.#orderModel.countByCategory(CATEGORIES.main)),
      this.#eventModel.getSpecialDiscount(this.#dateModel.hasStarMark()),
      this.#eventModel.getGift(totalPrice),
    ].filter(({ value }) => value !== 0);
  }

  /**
   * 총 혜택 금액을 반환하는 메소드
   *
   * @method
   * @returns {number}
   */
  getTotalBenfitPrice() {
    const benfitList = this.getBenfitList();
    const totalBenfitPrice = benfitList.reduce((total, { value }) => total + value, 0);

    return totalBenfitPrice;
  }

  /**
   * 할인 적용 후 총 결제 금액을 반환하는 메소드
   *
   * @method
   * @returns {number}
   */
  getTotalPriceAfterDiscount() {
    const totalPriceBeforeDiscount = this.#orderModel.getTotalPrice();
    const totalBenfitPrice = this.getBenfitList()
      .filter(({ name }) => name !== '증정 이벤트')
      .reduce((total, { value }) => total + value, 0);
    const totalPriceAfterDiscount = totalPriceBeforeDiscount - totalBenfitPrice;

    return totalPriceAfterDiscount;
  }

  /**
   * 배지를 반환하는 메소드
   *
   * @method
   * @returns {'산타' | '트리' | '별' | null}
   */
  getBadge() {
    const totalPriceAfterDiscount = this.getTotalPriceAfterDiscount();

    if (totalPriceAfterDiscount >= BADGE_CONDITION.santa) return EVENT.BADGE.santa;
    if (totalPriceAfterDiscount >= BADGE_CONDITION.tree) return EVENT.BADGE.tree;
    if (totalPriceAfterDiscount >= BADGE_CONDITION.santa) return EVENT.BADGE.star;
    return null;
  }
}

export default EventService;
