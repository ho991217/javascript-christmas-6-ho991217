import { REGEX } from '../constants/index.js';

/**
 * @typedef {import('../constants/number.js').Range} Range
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
