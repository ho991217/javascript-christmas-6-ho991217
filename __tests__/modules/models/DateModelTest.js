import DateModel from '../../../src/modules/models/DateModel';
import { YEAR } from '../../../src/constants/number';

describe('DateModel', () => {
  let dateModel;

  beforeEach(() => {
    dateModel = new DateModel();
  });

  describe('setDate and getDate', () => {
    test('방문 예정일을 가져와야한다.', () => {
      // given
      const date = 25;

      // when
      dateModel.setDate(date);

      // then
      expect(dateModel.getDate()).toBe(date);
    });
  });

  describe('getDay', () => {
    test('방문 예정일의 요일을 반환해야한다.', () => {
      // given
      const date = 25;
      const day = new Date(YEAR, 11, 25).getDay();

      // when
      dateModel.setDate(date);

      // then
      expect(dateModel.getDay()).toBe(day);
    });
  });

  describe('hasStarMark', () => {
    test('방문 예정일에 별 모양이 있는 경우를 확인한다', () => {
      // given
      const date = 25;

      // when
      dateModel.setDate(date);

      // then
      expect(dateModel.hasStarMark()).toBeTruthy();
    });
  });

  describe('isWeekend', () => {
    test('방문 예정일이 주말인 경우를 확인한다', () => {
      // given
      const date = 23; // 토요일

      // when
      dateModel.setDate(date);

      // then
      expect(dateModel.isWeekend()).toBeTruthy();
    });
  });

  describe('isWeekday', () => {
    test('방문 예정일이 평일인 경우를 확인한다', () => {
      // given
      const date = 21; // 목요일

      // when
      dateModel.setDate(date);

      // then
      expect(dateModel.isWeekday()).toBeTruthy();
    });
  });
});
