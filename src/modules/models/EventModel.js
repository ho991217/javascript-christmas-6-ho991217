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
    return 1_000 + date * 100;
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

  getAppliedEventList() {
    if (OrderModel.getTotalPrice() < 10_000) return [];
    return [
      ['크리스마스 디데이 할인', this.getChristmasDdayDiscount()],
      ['평일 할인', this.getWeekdayDiscount()],
      ['주말 할인', this.getWeekendDiscount()],
      ['특별 할인', this.getSpecialDiscount()],
      ['증정 이벤트', this.getGift()],
    ].filter(([, value]) => value !== 0);
  },
};

export default EventModel;
