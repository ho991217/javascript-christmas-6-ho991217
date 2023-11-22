const POSITIVE_INTEGER = /^[1-9]\d*$/;
const EMPTY_STRING = /^\s*$/;
const TOKENIZABLE_MENU = /^[가-힣]+-[1-9][0-9]*(,[가-힣]+-[1-9][0-9]*)*$/;

const REGEX = Object.freeze({
  POSITIVE_INTEGER,
  EMPTY_STRING,
  TOKENIZABLE_MENU,
});

export default REGEX;
