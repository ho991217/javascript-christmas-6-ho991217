import MenuModel from '../../../src/modules/models/MenuModel';
import { MENU } from '../../../src/constants';

describe('MenuModel', () => {
  describe('getAll', () => {
    test('모든 메뉴를 반환한다', () => {
      // given
      // when
      const menus = MenuModel.getAll();

      // then
      expect(menus).toEqual(MENU);
    });
  });

  describe('getPriceByName', () => {
    test('주어진 메뉴의 가격을 반환한다', () => {
      // given
      const menuName = '크리스마스파스타';
      const price = MenuModel.getPriceByName(menuName);

      // then
      const expectedPrice = MENU.find((menu) => menu.name === menuName).price;

      // when
      expect(price).toBe(expectedPrice);
    });
  });

  describe('getCategoryByName', () => {
    test('주어진 메뉴의 카테고리를 반환한다', () => {
      // given
      const menuName = '크리스마스파스타';
      const category = MenuModel.getCategoryByName(menuName);

      // then
      const expectedCategory = MENU.find((menu) => menu.name === menuName).category;

      // when
      expect(category).toBe(expectedCategory);
    });
  });

  describe('isExist', () => {
    test('메뉴가 존재하는 경우 true를 반환한다', () => {
      // given
      const menuName = '크리스마스파스타';

      // when
      const isExist = MenuModel.isExist(menuName);

      // then
      expect(isExist).toBeTruthy();
    });

    test('메뉴가 존재하지 않는 경우 false를 반환한다', () => {
      // given
      const menuName = '존재하지 않는 메뉴';

      // when
      const isExist = MenuModel.isExist(menuName);

      // then
      expect(isExist).toBeFalsy();
    });
  });
});
