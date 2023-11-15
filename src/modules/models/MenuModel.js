import { MENU } from '../../constants/index.js';

/**
 * @typedef {import('../../constants/menu').Menu} Menu
 */

/**
 * @typedef {Object} MenuModel
 * @property {Menu[]} menu
 * @property {function(): Menu[]} getAll
 * @property {function(string): number} getPriceByName
 * @property {function(string): string} getCategoryByName
 * @property {function(string): boolean} isExist
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
