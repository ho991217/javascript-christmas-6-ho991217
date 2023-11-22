import { YEAR } from '../../constants/number.js';

const DECEMBER = 11;

class DateModel {
  constructor() {
    this.expectVisitingDate = 0;
  }

  /**
   * 방문 예정일을 설정한다.
   * @method
   * @param {number} expectVisitingDate 방문 예정일
   * @returns {void}
   */
  setDate(expectVisitingDate) {
    this.expectVisitingDate = expectVisitingDate;
  }

  /**
   * 방문 예정일을 반환한다.
   * @method
   * @returns {number} 방문 예정일
   */
  getDate() {
    return this.expectVisitingDate;
  }

  /**
   * 방문 예정일의 요일을 반환한다.
   * @example 0: 일요일, 1: 월요일, ..., 6: 토요일
   * @method
   * @returns {number} 방문 예정일의 요일
   */
  getDay() {
    const date = new Date(YEAR, DECEMBER, this.expectVisitingDate);
    return date.getDay();
  }

  /**
   * 방문 예정일에 별 모양이 있는지 확인한다.
   * @method
   * @returns {boolean} 방문 예정일에 별 모양이 있는지 여부
   */
  hasStarMark() {
    return this.getDay() === 0 || this.expectVisitingDate === 25;
  }

  /**
   * 방문 예정일이 주말인지 확인한다.
   * @method
   * @returns {boolean} 방문 예정일이 주말인지 여부
   */
  isWeekend() {
    return this.getDay() === 5 || this.getDay() === 6;
  }

  /**
   * 방문 예정일이 평일인지 확인한다.
   * @method
   * @returns {boolean} 방문 예정일이 평일인지 여부
   */
  isWeekday() {
    return !this.isWeekend();
  }
}

export default DateModel;
