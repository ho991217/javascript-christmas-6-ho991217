import { EVENT } from '../../constants/index.js';
import { GIFT_EVENT_CONDITION } from '../../constants/number.js';
import MenuModel from './MenuModel.js';

/**
 * @typedef {Object} EVENT
 * @property {string} name
 * @property {string} value
 */

/**
 * @typedef {Object} EventModel
 * @property {function(number): EVENT} getChristmasDdayDiscount 크리스마스 디데이 이벤트 이름과 할인 금액을 반환한다.
 * @property {function(boolean, number): EVENT} getWeekdayDiscount 평일 이벤트 이름과 할인 금액을 반환한다.
 * @property {function(boolean, number): EVENT} getWeekendDiscount 주말 이벤트 이름과 할인 금액을 반환한다.
 * @property {function(boolean): EVENT} getSpecialDiscount 스페셜 이벤트 이름과 할인 금액을 반환한다.
 * @property {function(number): EVENT} getGift 증정 이벤트 이름과 증정품 가격을 반환한다.
 */

/**
 * @type {EventModel}
 */
const EventModel = {
  getChristmasDdayDiscount(date) {
    const result = { name: EVENT.NAME.christmasDdayDiscount, value: 0 };
    if (date > 25) return result;

    return { ...result, value: 1_000 + (date - 1) * 100 };
  },

  getWeekdayDiscount(isWeekday, dessertCount) {
    const result = { name: EVENT.NAME.weekdayDiscount, value: 0 };
    if (!isWeekday || dessertCount === 0) return result;

    return { ...result, value: dessertCount * 2_023 };
  },

  getWeekendDiscount(isWeekend, mainCount) {
    const result = { name: EVENT.NAME.weekendDiscount, value: 0 };
    if (!isWeekend || mainCount === 0) return result;

    return { ...result, value: mainCount * 2_023 };
  },

  getSpecialDiscount(hasStarMark) {
    const result = { name: EVENT.NAME.specialDiscount, value: 0 };
    if (!hasStarMark) return result;

    return { ...result, value: 1_000 };
  },

  getGift(totalPrice) {
    const result = { name: EVENT.NAME.gift, value: 0 };
    if (totalPrice < GIFT_EVENT_CONDITION) {
      return result;
    }
    return { ...result, value: MenuModel.getPriceByName(EVENT.GIFT) };
  },
};

export default EventModel;
