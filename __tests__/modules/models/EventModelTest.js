import EventModel from '../../../src/modules/models/EventModel';
import { EVENT, MENU } from '../../../src/constants';
import { GIFT_EVENT_CONDITION } from '../../../src/constants/number';

jest.mock('../../../src/modules/models', () => ({
  getPriceByName: jest.fn().mockReturnValue(5000), // 샴페인의 가격 예시
}));

describe('EventModel', () => {
  describe('getChristmasDdayDiscount', () => {
    test('크리스마스 디데이 할인을 계산한다', () => {
      // given
      const date = 24;
      const discountPrice = 1000 + (date - 1) * 100;
      const expectedResult = { name: EVENT.NAME.christmasDdayDiscount, value: discountPrice };

      // when
      const discount = EventModel.getChristmasDdayDiscount(date);

      // then
      expect(discount).toEqual(expectedResult);
    });
  });

  describe('getWeekdayDiscount', () => {
    test('평일 할인을 계산한다', () => {
      // given
      const dessertCount = 2;
      const discountPrice = dessertCount * 2023;
      const expectedResult = { name: EVENT.NAME.weekdayDiscount, value: discountPrice };

      // when
      const discount = EventModel.getWeekdayDiscount(dessertCount);

      // then
      expect(discount).toEqual(expectedResult);
    });
  });

  describe('getWeekendDiscount', () => {
    test('주말 할인을 계산한다', () => {
      // given
      const mainCount = 3;
      const discountPrice = mainCount * 2023;
      const expectedResult = { name: EVENT.NAME.weekendDiscount, value: discountPrice };

      // when
      const discount = EventModel.getWeekendDiscount(mainCount);

      // then
      expect(discount).toEqual(expectedResult);
    });
  });

  describe('getSpecialDiscount', () => {
    test('스페셜 할인을 계산한다', () => {
      // given
      const hasStarMark = true;
      const discountPrice = 1000;
      const expectedResult = { name: EVENT.NAME.specialDiscount, value: discountPrice };

      // when
      const discount = EventModel.getSpecialDiscount(hasStarMark);

      // then
      expect(discount).toEqual(expectedResult);
    });
  });

  describe('getGift', () => {
    test('증정 이벤트를 계산한다', () => {
      // given
      const totalPrice = GIFT_EVENT_CONDITION + 1;
      const giftPrice = MENU.find((menu) => menu.name === EVENT.GIFT).price;
      const expectedResult = { name: EVENT.NAME.gift, value: giftPrice };

      // when
      const gift = EventModel.getGift(totalPrice);

      // then
      expect(gift).toEqual(expectedResult);
    });

    test('증정 이벤트에 해당되지 않으면 0원을 반환해야한다.', () => {
      // given
      const totalPrice = GIFT_EVENT_CONDITION - 1;
      const expectedResult = { name: EVENT.NAME.gift, value: 0 };

      // when
      const gift = EventModel.getGift(totalPrice);

      // then
      expect(gift).toEqual(expectedResult);
    });
  });
});
