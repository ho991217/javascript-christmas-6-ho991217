import EVENT_NAME from '../../constants/event.js';
import { GIFT_EVENT_CONDITION } from '../../constants/number.js';
import DateModel from './DateModel.js';
import MenuModel from './MenuModel.js';

/**
 * @type {EventModel}
 */
const EventModel = {
  getChristmasDdayDiscount() {
    const result = { name: EVENT_NAME.CHRISTMAS_DDAY_DISCOUNT, value: 0 };
    const date = DateModel.getDate();
    if (date > 25) return result;

    return { ...result, value: 1_000 + (date - 1) * 100 };
  },

  getWeekdayDiscount(dessertCount) {
    const result = { name: EVENT_NAME.WEEKDAY_DISCOUNT, value: 0 };
    if (dessertCount === 0) return result;

    return { ...result, value: dessertCount * 2_023 };
  },

  getWeekendDiscount(mainCount) {
    const result = { name: EVENT_NAME.WEEKEND_DISCOUNT, value: 0 };
    if (mainCount === 0) return result;

    return { ...result, value: mainCount * 2_023 };
  },

  getSpecialDiscount() {
    const result = { name: EVENT_NAME.SPECIAL_DISCOUNT, value: 0 };
    if (!DateModel.hasStarMark()) return result;

    return { ...result, value: 1_000 };
  },

  getGift(totalPrice) {
    const result = { name: EVENT_NAME.GIFT, value: 0 };
    if (totalPrice < GIFT_EVENT_CONDITION) {
      return result;
    }
    return { ...result, value: MenuModel.getPriceByName('샴페인') };
  },
};

export default EventModel;
