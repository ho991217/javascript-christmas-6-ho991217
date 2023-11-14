/**
 * @typedef {Object} FormatModel
 * @property {function} formatMoney - 숫자를 한국 통화 형태로 변환
 */

const FormatModel = {
  formatTitle(title) {
    return `< ${title} >`;
  },

  formatMoney(value) {
    return `${value.toLocaleString('ko-KR')}원`;
  },
};

export default FormatModel;
