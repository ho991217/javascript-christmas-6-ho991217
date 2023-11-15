import { MENU } from '../../constants/index.js';

/**
 * @typedef {import('../../constants/menu').Menu} Menu
 */

/**
 * @typedef {Object} MenuModel
 * @property {Menu[]} menu 메뉴 목록
 * @property {function(): Menu[]} getAll 모든 메뉴를 반환한다.
 * @property {function(string): number} getPriceByName 주어진 메뉴의 가격을 반환한다.
 * @property {function(string): string} getCategoryByName 주어진 메뉴의 카테고리를 반환한다.
 * @property {function(string): boolean} isExist 메뉴가 존재하는지 확인한다.
 */

/**
 * @type {MenuModel}
 */
const MenuModel = {
  menu: MENU,

  getAll() {
    return this.menu;
  },

  getPriceByName(name) {
    return this.menu.find((menu) => menu.name === name).price;
  },

  getCategoryByName(name) {
    return this.menu.find((menu) => menu.name === name).category;
  },

  isExist(name) {
    return this.menu.some((menu) => menu.name === name);
  },
};

export default MenuModel;
