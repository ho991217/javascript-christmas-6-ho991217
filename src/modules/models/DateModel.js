import { YEAR } from '../../constants/number.js';

const DECEMBER = 11;

/**
 * @typedef {Object} DateModel
 * @property {number} expectVisitingDate 방문 예정일
 * @property {function(): number} getDay 요일을 반환하는 메소드
 * @property {function(): boolean} hasStarMark 별표가 있는지 확인하는 메소드
 * @property {function(): boolean} isWeekend 주말인지 확인하는 메소드
 * @property {function(): boolean} isWeekday 주중인지 확인하는 메소드
 */

/**
 * @type {DateModel}
 */
class DateModel {
  constructor() {
    this.expectVisitingDate = 0;
  }

  setDate(expectVisitingDate) {
    this.expectVisitingDate = expectVisitingDate;
  }

  getDate() {
    return this.expectVisitingDate;
  }

  getDay() {
    const date = new Date(YEAR, DECEMBER, this.expectVisitingDate);
    return date.getDay();
  }

  hasStarMark() {
    return this.getDay() === 0 || this.expectVisitingDate === 25;
  }

  isWeekend() {
    return this.getDay() === 5 || this.getDay() === 6;
  }

  isWeekday() {
    return !this.isWeekend();
  }
}

export default DateModel;
