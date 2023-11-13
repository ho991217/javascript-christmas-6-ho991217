import { Console } from '@woowacourse/mission-utils';
import CustomError from './CustomError.js';
import ERROR_MESSAGE from '../constants/error.js';

/**
 * @param {Function} fn
 * @param {number} retriesLeft
 * @returns {Promise<any>}
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
