import { MENU } from '../../constants/index.js';

/**
 * @typedef {import('../../constants/menu').Menu} Menu
 */

/**
 * @typedef {Object} MenuModel
 * @property {Array} menu
 * @property {function(): Array} getAll
 * @property {function(string): Menu} findByName
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

  getPrice(name) {
    return this.menu.find((menu) => menu.name === name).price;
  },

  isExist(name) {
    return this.menu.some((menu) => menu.name === name);
  },
};

export default MenuModel;
