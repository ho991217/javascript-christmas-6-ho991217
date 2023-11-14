import { REGEX } from '../constants/index.js';

/**
 * @typedef {import('../constants/number.js').Range} Range
 */

/**
 * @typedef {Object} Validator
 * @property {number} expectVisitingDate 방문 예정일
 * @property {function(string): boolean} isPositiveInteger 양의 정수인지 확인하는 메소드
 * @property {function(string): boolean} isEmpty 빈 문자열인지 확인하는 메소드
 * @property {function(string, Range): boolean} isInRange 범위 내의 정수인지 확인하는 메소드
 * @property {function(string): boolean} isTokenizable 토큰화 가능한 문자열인지 확인하는 메소드
 */

/**
 * @type {Validator}
 */
const Validator = {
  isPositiveInteger(value) {
    return REGEX.POSITIVE_INTEGER.test(value);
  },

  isEmpty(value) {
    return REGEX.EMPTY_STRING.test(value);
  },

  isInRange(value, { min, max }) {
    return min <= value && value <= max;
  },

  isTokenizable(value) {
    return REGEX.TOKENIZABLE_MENU.test(value);
  },
};

export default Validator;
