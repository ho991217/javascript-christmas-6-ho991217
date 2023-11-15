import EventService from '../../../src/modules/services/EventService';
import { OrderModel, DateModel, EventModel } from '../../../src/modules/models';
import Format from '../../../src/utils/Format';
import { BADGE_CONDITION, GIFT_EVENT_CONDITION } from '../../../src/constants/number';
import { CATEGORIES } from '../../../src/constants/menu';
import { EVENT, MESSAGE } from '../../../src/constants';

jest.mock('../../../src/utils/Format');

describe('EventService', () => {
  let dateModel, orderModel, eventService;

  beforeEach(() => {
    dateModel = new DateModel();
    orderModel = new OrderModel();
    eventService = new EventService(dateModel, orderModel, EventModel);

    Format.menuWithCount.mockImplementation((name, count) => `${name} ${count}개`);
    Format.money.mockImplementation((value) => `${value.toLocaleString('ko-KR')}원`);
  });

  describe('getGift', () => {
    test('선물이 존재할 경우 해당 선물을 반환한다', () => {
      // given
      orderModel.getTotalPrice = jest.fn().mockReturnValue(GIFT_EVENT_CONDITION + 1);
      const expectedValue = Format.menuWithCount(EVENT.GIFT, 1);

      // when
      const gift = eventService.getGift();

      // then
      expect(gift).toBe(expectedValue);
    });

    test("선물이 존재하지 않을 경우 '없음'을 반환한다", () => {
      // given
      orderModel.getTotalPrice = jest.fn().mockReturnValue(GIFT_EVENT_CONDITION - 1);
      const expectedValue = MESSAGE.EMPTY_VALUE;

      // when
      const gift = eventService.getGift();

      // then
      expect(gift).toBe(expectedValue);
    });
  });

  describe('getBenefitList', () => {
    test('총 주문 금액이 10,000원 미만일 경우 빈 배열을 반환한다', () => {
      // given
      orderModel.getTotalPrice = jest.fn().mockReturnValue(9999);
      const expectedValue = [];

      // when
      const benefitList = eventService.getBenefitList();

      // then
      expect(benefitList).toEqual(expectedValue);
    });

    test('적절한 이벤트 혜택들을 반환한다', () => {
      // given
      orderModel.getTotalPrice = jest.fn().mockReturnValue(15000);
      orderModel.countByCategory = jest.fn((category) => {
        if (category === CATEGORIES.desserts) return 2;
        if (category === CATEGORIES.main) return 3;
        return 0;
      });
      dateModel.getDate = jest.fn().mockReturnValue(24);
      dateModel.hasStarMark = jest.fn().mockReturnValue(true);

      EventModel.getChristmasDdayDiscount = jest
        .fn()
        .mockReturnValue({ name: EVENT.NAME.christmasDdayDiscount, value: 2300 });
      EventModel.getWeekdayDiscount = jest
        .fn()
        .mockReturnValue({ name: EVENT.NAME.weekdayDiscount, value: 4046 });
      EventModel.getWeekendDiscount = jest
        .fn()
        .mockReturnValue({ name: EVENT.NAME.weekendDiscount, value: 6069 });
      EventModel.getSpecialDiscount = jest
        .fn()
        .mockReturnValue({ name: EVENT.NAME.specialDiscount, value: 1000 });
      EventModel.getGift = jest.fn().mockReturnValue({ name: EVENT.NAME.gift, value: 12000 });

      // when
      const benefitList = eventService.getBenefitList();

      // then
      expect(benefitList).toEqual([
        { name: '크리스마스 디데이 할인', value: 2300 },
        { name: '평일 할인', value: 4046 },
        { name: '주말 할인', value: 6069 },
        { name: '특별 할인', value: 1000 },
        { name: '증정 이벤트', value: 12000 },
      ]);
    });
  });

  describe('getTotalBenefitPrice', () => {
    test('혜택의 총 금액을 올바르게 반환한다', () => {
      // given
      eventService.getBenefitList = jest.fn().mockReturnValue([
        { name: '할인 이벤트1', value: 1000 },
        { name: '할인 이벤트2', value: 2000 },
      ]);
      const expectedValue = 3000;

      // when
      const totalBenefitPrice = eventService.getTotalBenefitPrice();

      // then
      expect(totalBenefitPrice).toBe(expectedValue);
    });
  });

  describe('getTotalPriceAfterDiscount', () => {
    test('할인 후 총 금액을 올바르게 반환한다', () => {
      // given
      orderModel.getTotalPrice = jest.fn().mockReturnValue(10000);
      eventService.getBenefitList = jest
        .fn()
        .mockReturnValue([{ name: '할인 이벤트', value: 1000 }]);
      const expectedValue = 9000;

      // when
      const totalPriceAfterDiscount = eventService.getTotalPriceAfterDiscount();

      // then
      expect(totalPriceAfterDiscount).toBe(expectedValue);
    });
  });

  describe('getBadge', () => {
    test('적절한 배지를 반환한다', () => {
      // given
      eventService.getTotalPriceAfterDiscount = jest.fn().mockReturnValue(BADGE_CONDITION.santa);
      const expectedValue = EVENT.BADGE.santa;

      // when
      const badge = eventService.getBadge();

      // then
      expect(badge).toBe(expectedValue);
    });
  });
});
