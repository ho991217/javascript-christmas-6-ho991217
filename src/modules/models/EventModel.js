import { EVENT } from '../../constants/index.js';
import { GIFT_EVENT_CONDITION } from '../../constants/number.js';
import MenuModel from './MenuModel.js';

/**
 * @type {EventModel}
 */
const EventModel = {
  getChristmasDdayDiscount(date) {
    const result = { name: EVENT.NAME.CHRISTMAS_DDAY_DISCOUNT, value: 0 };
    if (date > 25) return result;

    return { ...result, value: 1_000 + (date - 1) * 100 };
  },

  getWeekdayDiscount(dessertCount) {
    const result = { name: EVENT.NAME.WEEKDAY_DISCOUNT, value: 0 };
    if (dessertCount === 0) return result;

    return { ...result, value: dessertCount * 2_023 };
  },

  getWeekendDiscount(mainCount) {
    const result = { name: EVENT.NAME.WEEKEND_DISCOUNT, value: 0 };
    if (mainCount === 0) return result;

    return { ...result, value: mainCount * 2_023 };
  },

  getSpecialDiscount(hasStarMark) {
    const result = { name: EVENT.NAME.SPECIAL_DISCOUNT, value: 0 };
    if (!hasStarMark) return result;

    return { ...result, value: 1_000 };
  },

  getGift(totalPrice) {
    const result = { name: EVENT.NAME.GIFT, value: 0 };
    if (totalPrice < GIFT_EVENT_CONDITION) {
      return result;
    }
    return { ...result, value: MenuModel.getPriceByName(EVENT.GIFT) };
  },
};

export default EventModel;
