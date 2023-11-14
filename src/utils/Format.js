const Format = {
  title(title) {
    return `< ${title} >`;
  },

  money(value) {
    return `${value.toLocaleString('ko-KR')}원`;
  },
};

export default Format;
