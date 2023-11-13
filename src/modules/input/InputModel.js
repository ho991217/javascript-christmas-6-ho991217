import REGEX from '../../constants/regex.js';

/**
 * @typedef {import('../../constants/number.js').Range} Range
 */

/**
 * @typedef {Object} InputModel
 * @property {function(string): boolean} isPositiveInteger 양의 정수인지 확인하는 메소드
 * @property {function(string): boolean} isEmpty 빈 문자열인지 확인하는 메소드
 * @property {function(string, Range): boolean} isInRange 범위 내의 정수인지 확인하는 메소드
 */

/**
 * @type {InputModel}
 */
const InputModel = {
  isPositiveInteger(value) {
    return REGEX.POSITIVE_INTEGER.test(value);
  },

  isEmpty(value) {
    return REGEX.EMPTY_STRING.test(value);
  },

  isInRange(value, { min, max }) {
    return min <= value && value <= max;
  },
};

export default InputModel;
