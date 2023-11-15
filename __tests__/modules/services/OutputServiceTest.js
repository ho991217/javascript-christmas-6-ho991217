import OutputService from '../../../src/modules/services/OutputService';
import { OrderModel, MenuModel } from '../../../src/modules/models';
import Format from '../../../src/utils/Format';
import { MENU } from '../../../src/constants';

jest.mock('../../../src/utils/Format');

describe('OutputService', () => {
  let orderModel;
  let menuModel;
  let outputService;
  const mockMenu = [MENU[0], MENU[1]];

  beforeEach(() => {
    orderModel = new OrderModel();
    menuModel = MenuModel;
    outputService = new OutputService(orderModel, menuModel);

    Format.menuWithCount.mockImplementation((menu, count) => `${menu} ${count}개`);
  });

  describe('getOrderedMenuList 메소드', () => {
    test('주문한 메뉴와 수량을 올바른 형식으로 반환해야 한다', () => {
      // given
      orderModel.add(mockMenu[0].name, 2);
      orderModel.add(mockMenu[1].name, 1);
      const expectedValue = [`${mockMenu[0].name} 2개`, `${mockMenu[1].name} 1개`];

      // when
      const orderedMenuList = outputService.getOrderedMenuList();

      // then
      expect(orderedMenuList).toEqual(expectedValue);
    });
  });

  describe('getTotalPriceBeforeDiscount 메소드', () => {
    it('할인 적용 전 총 결제 금액을 올바르게 반환해야 한다', () => {
      // given
      orderModel.add(mockMenu[0].name, 2);
      orderModel.add(mockMenu[1].name, 1);
      menuModel.getPriceByName = jest.fn().mockImplementation((menu) => {
        if (menu === mockMenu[0].name) return mockMenu[0].price;
        if (menu === mockMenu[1].name) return mockMenu[1].price;
        return 0;
      });
      const expectedValue = mockMenu[0].price * 2 + mockMenu[1].price * 1;

      // when
      const totalPrice = outputService.getTotalPriceBeforeDiscount();

      // then
      expect(totalPrice).toBe(expectedValue);
    });
  });
});
