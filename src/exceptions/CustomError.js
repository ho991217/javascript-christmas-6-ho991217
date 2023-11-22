import { ERROR_HEADER } from '../constants/error.js';

class CustomError extends Error {
  constructor(message = '예상치 못한 오류입니다.', name = 'CustomError') {
    super(`${ERROR_HEADER} ${message}`);
    this.name = name;
  }
}

export default CustomError;
