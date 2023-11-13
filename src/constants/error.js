export const ERROR_HEADER = '[ERROR]';

// 입력 오류
const EMPTY_INPUT = '입력이 없습니다.';
const INVALID_DATE = '유효하지 않은 날짜입니다.';
const MAXIMUM_TRY = '최대 허용 시도 횟수를 초과했습니다.';

const ERROR_MESSAGE = Object.freeze({
  EMPTY_INPUT,
  INVALID_DATE,
  MAXIMUM_TRY,
});

export default ERROR_MESSAGE;
