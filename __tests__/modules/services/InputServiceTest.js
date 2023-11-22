import InputError from '../../../src/exceptions/InputError';
import InputService from '../../../src/modules/services/InputService';
import { DateModel, MenuModel, OrderModel } from '../../../src/modules/models/index.js';

import { MENU } from '../../../src/constants';
import { DRINKS } from '../../../src/constants/menu';

describe('InputService 클래스 기능 테스트', () => {
  let inputService;
  let dateModel;
  let orderModel;

  beforeEach(() => {
    dateModel = new DateModel();
    orderModel = new OrderModel();
    inputService = new InputService(dateModel, orderModel, MenuModel);
  });

  describe('processDateInput 메소드 테스트', () => {
    test('유효한 입력값이 들어오면 DateModel에 값을 입력해야한다.', () => {
      // given
      const date = 5;
      const expectedValue = 5;

      // when
      inputService.processDateInput(date);

      // then
      expect(dateModel.getDate()).toBe(expectedValue);
    });

    test('빈 입력이 들어오면 에러를 발생시킨다.', () => {
      // given
      const input = '';

      // when
      // then
      expect(() => inputService.processDateInput(input)).toThrow(InputError);
    });

    test('정수가 아닌 입력이 들어오면 에러를 발생시킨다.', () => {
      // given
      const input = 'abc';

      // when
      // then
      expect(() => inputService.processDateInput(input)).toThrow(InputError);
    });

    test('범위 밖의 정수가 입력되면 에러를 발생시킨다.', () => {
      // given
      const input = 32;

      // when
      // then
      expect(() => inputService.processDateInput(input)).toThrow(InputError);
    });
  });

  describe('processMenuInput 메소드 테스트', () => {
    const menu1 = MENU[0].name;
    const menu2 = MENU[1].name;
    const stringify = (menu, count) => `${menu}-${count}`;

    test('유효한 입력이 들어오면 OrderModel에 등록한다.', () => {
      // given
      const order = [
        [menu1, 2],
        [menu2, 1],
      ];

      // when
      inputService.processMenuInput(order.map(([menu, count]) => stringify(menu, count)).join(','));

      // then
      expect(orderModel.getNames()).toEqual([menu1, menu2]);
      expect(orderModel.get(menu1)).toBe(2);
      expect(orderModel.get(menu2)).toBe(1);
    });

    test('빈 값을 넣으면 에러를 일으켜야한다.', () => {
      // given
      const input = '';

      // when
      // then
      expect(() => inputService.processMenuInput(input)).toThrow(InputError);
    });

    test('존재하지 않는 메뉴를 입력하면 에러를 일으켜야한다.', () => {
      // given
      const menu = stringify('존재하지않는메뉴', 1);

      // when
      // then
      expect(() => inputService.processMenuInput(menu)).toThrow(InputError);
    });

    test('이미 존재하는 메뉴를 입력하면 에러를 일으켜야한다.', () => {
      // given
      const input = [menu1, menu1].map((menu) => stringify(menu, 1)).join(',');

      // when
      // then
      expect(() => inputService.processMenuInput(input)).toThrow(InputError);
    });

    test('주문 개수가 0이하이면 에러를 일으켜야한다.', () => {
      // given
      const input = stringify(menu1, 0);

      // when
      // then
      expect(() => inputService.processMenuInput(input)).toThrow(InputError);
    });

    test('전체 주문 개수가 20개 초과라면 에러를 일으켜야한다.', () => {
      // given
      const input = [menu1, menu2].map((menu) => stringify(menu, 11)).join(',');

      // when
      // then
      expect(() => inputService.processMenuInput(input)).toThrow(InputError);
    });

    test('음료만 주문하면 에러를 일으켜야한다.', () => {
      // given
      const input = stringify(DRINKS[0].name, 1);

      // when
      // then
      expect(() => inputService.processMenuInput(input)).toThrow(InputError);
    });
  });
});
