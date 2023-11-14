const Format = {
  title(title) {
    return `<${title}>`;
  },

  money(value) {
    return `${value.toLocaleString('ko-KR')}원`;
  },

  menuWithCount(name, count) {
    return `${name} ${count}개`;
  },
};

export default Format;
