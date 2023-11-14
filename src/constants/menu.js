/**
 * @typedef {Object} Category
 * @property {'appetizer'} appetizers
 * @property {'main'} main_dishes
 * @property {'dessert'} desserts
 * @property {'drink'} drinks
 */

/**
 * @typedef {Object} Menu
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {Category} category
 */

/** @type {Category} */
export const CATEGORIES = Object.freeze({
  appetizers: 'appetizer',
  main_dishes: 'main',
  desserts: 'dessert',
  drinks: 'drink',
});

/** @type {Menu[]} */
export const APPETIZERS = Object.freeze([
  {
    id: 1,
    name: '양송이수프',
    price: 6_000,
    category: CATEGORIES.appetizers,
  },
  {
    id: 2,
    name: '타파스',
    price: 5_500,
    category: CATEGORIES.appetizers,
  },
  {
    id: 3,
    name: '시저샐러드',
    price: 8_000,
    category: CATEGORIES.appetizers,
  },
]);

/** @type {Menu[]} */
export const MAIN_DISHES = Object.freeze([
  {
    id: 4,
    name: '티본스테이크',
    price: 55_000,
    category: CATEGORIES.main_dishes,
  },
  {
    id: 5,
    name: '바비큐립',
    price: 54_000,
    category: CATEGORIES.main_dishes,
  },
  {
    id: 6,
    name: '해산물파스타',
    price: 35_000,
    category: CATEGORIES.main_dishes,
  },
  {
    id: 7,
    name: '크리스마스파스타',
    price: 25_000,
    category: CATEGORIES.main_dishes,
  },
]);

/** @type {Menu[]} */
export const DESSERTS = Object.freeze([
  {
    id: 8,
    name: '초코케이크',
    price: 15_000,
    category: CATEGORIES.desserts,
  },
  {
    id: 9,
    name: '아이스크림',
    price: 5_000,
    category: CATEGORIES.desserts,
  },
]);

/** @type {Menu[]} */
export const DRINKS = Object.freeze([
  {
    id: 10,
    name: '제로콜라',
    price: 3_000,
    category: CATEGORIES.drinks,
  },
  {
    id: 11,
    name: '레드와인',
    price: 60_000,
    category: CATEGORIES.drinks,
  },
  {
    id: 12,
    name: '샴페인',
    price: 25_000,
    category: CATEGORIES.drinks,
  },
]);

/** @type {Menu[]} */
const MENU = Object.freeze([...APPETIZERS, ...MAIN_DISHES, ...DESSERTS, ...DRINKS]);

export default MENU;
