import { Console } from '@woowacourse/mission-utils';
import CustomError from './CustomError.js';
import ERROR_MESSAGE from '../constants/error.js';

/**
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
    Console.print(error.message);
    if (retriesLeft) {
      return retryOnError(fn, retriesLeft - 1);
    }
    throw new CustomError(ERROR_MESSAGE.MAXIMUM_TRY);
  }
}

export default retryOnError;
