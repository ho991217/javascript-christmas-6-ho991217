/**
 * inclusive한 범위를 나타내는 객체입니다.
 *
 * @typedef {Object} Range
 * @property {number} min 최소값
 * @property {number} max 최대값
 */

/**
 * @type {Range} DATE_RANGE 날짜 범위
 */
export const DATE_RANGE = Object.freeze({
  min: 1,
  max: 31,
});

/**
 * @type {Range} CHRISTMAS_D_DAY_EVENT_DATE 크리스마스 이벤트 날짜 범위
 */
export const CHRISTMAS_D_DAY_EVENT_DATE = Object.freeze({
  min: 1,
  max: 25,
});

export const YEAR = 2023;

export const GIFT_EVENT_CONDITION = 120_000;
