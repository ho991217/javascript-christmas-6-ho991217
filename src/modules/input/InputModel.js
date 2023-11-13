import REGEX from '../../constants/regex.js';

const InputModel = {
  isPositiveInteger(value) {
    return REGEX.POSITIVE_INTEGER.test(value);
  },

  isEmpty(value) {
    return REGEX.EMPTY_STRING.test(value);
  },
};

export default InputModel;
