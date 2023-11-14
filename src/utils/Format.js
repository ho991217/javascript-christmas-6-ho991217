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

  benfit(name, value) {
    return `${name}: -${this.money(value)}`;
  },
};

export default Format;
