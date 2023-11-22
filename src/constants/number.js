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

/**
 * @description 이벤트 년도
 * 이 값만 변경하면 다른 년도의 이벤트를 계산할 수 있습니다.
 */
export const YEAR = 2023;

export const GIFT_EVENT_CONDITION = 120_000;

export const BADGE_CONDITION = Object.freeze({
  santa: 20_000,
  tree: 10_000,
  star: 5_000,
});
