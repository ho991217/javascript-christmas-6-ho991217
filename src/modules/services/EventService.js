import EVENT from '../../constants/event.js';
import { CATEGORIES } from '../../constants/menu.js';
import MESSAGE from '../../constants/message.js';
import { BADGE_CONDITION } from '../../constants/number.js';

/**
 * @typedef {import('../models/EventModel').EVENT} Event
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
   * 방문 예정 날짜를 출력하는 메소드
   *
   * @method
   * @returns {string}
   */
  getVisitDate() {
    const date = this.#dateModel.getDate();
    return date;
  }

  /**
   * 이벤트 종류와 금액을 반환하는 메소드
   *
   * @method
   * @returns {Array<Event>}
   */
  getBenefitList() {
    const totalPrice = this.#orderModel.getTotalPrice();
    if (totalPrice < 10_000) return [];

    return [
      this.#getChristmasDdayDiscount(),
      this.#getWeekdayDiscount(),
      this.#getWeekendDiscount(),
      this.#getSpecialDiscount(),
      this.getGift(),
    ].filter(({ value }) => value !== 0);
  }

  #getChristmasDdayDiscount() {
    const date = this.#dateModel.getDate();
    return this.#eventModel.getChristmasDdayDiscount(date);
  }

  #getWeekdayDiscount() {
    const isWeekday = this.#dateModel.isWeekday();
    const dessertCount = this.#orderModel.countByCategory(CATEGORIES.desserts);
    return this.#eventModel.getWeekdayDiscount(isWeekday, dessertCount);
  }

  #getWeekendDiscount() {
    const isWeekend = this.#dateModel.isWeekend();
    const mainCount = this.#orderModel.countByCategory(CATEGORIES.main_dishes);
    return this.#eventModel.getWeekendDiscount(isWeekend, mainCount);
  }

  #getSpecialDiscount() {
    const hasStarMark = this.#dateModel.hasStarMark();
    return this.#eventModel.getSpecialDiscount(hasStarMark);
  }

  /**
   * 증정품을 반환하는 메소드
   *
   * @method
   * @returns {Event}
   */
  getGift() {
    const totalPrice = this.#orderModel.getTotalPrice();
    const gift = this.#eventModel.getGift(totalPrice);

    return gift;
  }

  /**
   * 총 혜택 금액을 반환하는 메소드
   *
   * @method
   * @returns {number}
   */
  getTotalBenefitPrice() {
    const benefitList = this.getBenefitList();
    const totalBenefitPrice = benefitList.reduce((total, { value }) => total + value, 0);

    return totalBenefitPrice;
  }

  /**
   * 할인 적용 후 총 결제 금액을 반환하는 메소드
   *
   * @method
   * @returns {number}
   */
  getTotalPriceAfterDiscount() {
    const totalPriceBeforeDiscount = this.#orderModel.getTotalPrice();
    const totalBenefitPrice = this.getBenefitList()
      .filter(({ name }) => name !== '증정 이벤트')
      .reduce((total, { value }) => total + value, 0);
    const totalPriceAfterDiscount = totalPriceBeforeDiscount - totalBenefitPrice;

    return totalPriceAfterDiscount;
  }

  /**
   * 배지를 반환하는 메소드
   *
   * @method
   * @returns {'산타' | '트리' | '별' | '없음'}
   */
  getBadge() {
    const totalPriceAfterDiscount = this.getTotalBenefitPrice();

    if (totalPriceAfterDiscount >= BADGE_CONDITION.santa) return EVENT.BADGE.santa;
    if (totalPriceAfterDiscount >= BADGE_CONDITION.tree) return EVENT.BADGE.tree;
    if (totalPriceAfterDiscount >= BADGE_CONDITION.star) return EVENT.BADGE.star;
    return MESSAGE.EMPTY_VALUE;
  }
}

export default EventService;
