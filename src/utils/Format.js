const Format = {
  title(title) {
    return `<${title}>`;
  },

  money(value) {
    if (value === 0) return '0원';
    return `${value.toLocaleString('ko-KR')}원`;
  },

  menuWithCount(name, count) {
    return `${name} ${count}개`;
  },

  benefit(name, value) {
    return `${name}: -${this.money(value)}`;
  },
};

export default Format;
