import REGEX from '../../constants/regex.js';

const InputModel = {
  /**
   * value가 양의 정수인지 확인합니다.
   * @param {string} value 검사할 값
   * @returns {boolean} 양의 정수이면 true, 아니면 false
   */
  isPositiveInteger(value) {
    return REGEX.POSITIVE_INTEGER.test(value);
  },

  /**
   * value가 빈 문자열인지 확인합니다.
   * @param {string} value 검사할 값
   * @returns {boolean} 빈 문자열이면 true, 아니면 false
   */
  isEmpty(value) {
    return REGEX.EMPTY_STRING.test(value);
  },

  /**
   * inclusive한 범위를 나타내는 객체입니다.
   *
   * @typedef {Object} Range
   * @property {number} min 최소값
   * @property {number} max 최대값
   */

  /**
   * value가 범위 내의 정수인지 확인합니다.
   *
   * @param {string} value 검사할 값
   * @param {Range} range 범위
   * @returns {boolean} 범위 내의 양의 정수이면 true, 아니면 false
   */
  isInRange(value, { min, max }) {
    return min <= value && value <= max;
  },
};

export default InputModel;
