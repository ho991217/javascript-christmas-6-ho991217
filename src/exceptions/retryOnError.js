import { Console } from '@woowacourse/mission-utils';
import CustomError from './CustomError.js';
import { ERROR_MESSAGE } from '../constants/index.js';

/**
 * Custom 에러 혹은 그 상속자 에러가 발생했을때,
 *
 * retriesLeft회 까지 재시도하는 함수
 * @typedef {Function} RetryOnError
 * @type {RetryOnError}
 * @param {Function<T>} fn
 * @param {number} retriesLeft
 * @returns {Promise<T>}
 */
async function retryOnError(fn, retriesLeft = 5) {
  try {
    const res = await fn();
    return res;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw error;
    }
    Console.print(error.message);
    if (retriesLeft) {
      return retryOnError(fn, retriesLeft - 1);
    }
    throw new CustomError(ERROR_MESSAGE.MAXIMUM_TRY);
  }
}

export default retryOnError;
