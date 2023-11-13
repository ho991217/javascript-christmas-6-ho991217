import REGEX from '../../constants/regex.js';

const InputModel = {
  isPositiveInteger(value) {
    return REGEX.POSITIVE_INTEGER.test(value);
  },
};

export default InputModel;
