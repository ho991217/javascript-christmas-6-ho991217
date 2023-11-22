import OrderModel from '../../../src/modules/models/OrderModel';
import MENU, { CATEGORIES } from '../../../src/constants/menu';

describe('OrderModel', () => {
  let orderModel;

  beforeEach(() => {
    orderModel = new OrderModel();
  });

  describe('add and get', () => {
    test('주문을 추가하고 조회한다', () => {
      // given
      const { name } = MENU[0];
      const count = 2;

      // when
      orderModel.add(name, count);

      // then
      expect(orderModel.get(name)).toBe(count);
    });
  });

  describe('countByCategory', () => {
    test('카테고리에 해당하는 주문수를 계산한다', () => {
      // given
      const { name, category } = MENU[0];
      const count = 2;

      // when
      orderModel.add(name, count);

      // then
      expect(orderModel.countByCategory(category)).toBe(count);
    });
  });

  describe('getTotalPrice', () => {
    test('주문 총액을 계산한다', () => {
      // given
      const { name, price } = MENU[0];
      const count = 2;

      // when
      orderModel.add(name, count);

      // then
      expect(orderModel.getTotalPrice()).toBe(price * count);
    });
  });

  describe('getTotalAmount', () => {
    test('주문 총수량을 계산한다', () => {
      // given
      MENU.slice(0, 2).forEach(({ name }) => orderModel.add(name, 3));

      // when
      // then
      expect(orderModel.getTotalAmount()).toBe(6);
    });
  });

  describe('getAll and getNames', () => {
    test('모든 주문과 주문 이름 목록을 반환한다', () => {
      // given
      const { name } = MENU[0];
      const count = 2;
      orderModel.add(name, count);

      // when
      // then
      expect(orderModel.getAll()).toEqual(new Map([[name, count]]));
      expect(orderModel.getNames()).toEqual([name]);
    });
  });

  describe('isExist', () => {
    test('주문이 존재하는지 확인한다', () => {
      // given
      const { name } = MENU[0];
      const count = 2;

      // when
      // then
      expect(orderModel.isExist(name)).toBeFalsy();
      orderModel.add(name, count);

      expect(orderModel.isExist(name)).toBeTruthy();
    });
  });

  describe('clear', () => {
    test('모든 주문을 삭제한다', () => {
      // given
      const { name } = MENU[0];
      const count = 2;
      orderModel.add(name, count);

      // when
      orderModel.clear();

      // then
      expect(orderModel.getAll()).toEqual(new Map());
    });
  });
});
