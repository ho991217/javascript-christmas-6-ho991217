import { CATEGORIES } from '../../constants/menu.js';
import { GIFT_EVENT_CONDITION } from '../../constants/number.js';
import DateModel from './DateModel.js';
import MenuModel from './MenuModel.js';
import OrderModel from './OrderModel.js';

/**
 * @type {EventModel}
 */
const EventModel = {
  getChristmasDdayDiscount() {
    const date = DateModel.getDate();
    if (date > 25) return 0;
    return 1_000 + (date - 1) * 100;
  },

  getWeekdayDiscount() {
    const dessertCount = OrderModel.countByCategory(CATEGORIES.desserts);
    if (dessertCount === 0) return 0;
    return dessertCount * 2_023;
  },

  getWeekendDiscount() {
    const mainCount = OrderModel.countByCategory(CATEGORIES.main);
    if (mainCount === 0) return 0;
    return mainCount * 2_023;
  },

  getSpecialDiscount() {
    if (!DateModel.hasStarMark()) return 0;
    return 1_000;
  },

  getGift() {
    const totalPrice = OrderModel.getTotalPrice();
    if (totalPrice >= GIFT_EVENT_CONDITION) {
      return MenuModel.getPriceByName('샴페인');
    }
    return 0;
  },
};

export default EventModel;
