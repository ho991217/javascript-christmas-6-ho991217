import CustomError from './CustomError.js';

class InputError extends CustomError {
  constructor(message) {
    super(`${message} 다시 입력해 주세요.\n`);
    this.name = 'InputError';
  }
}

export default InputError;
