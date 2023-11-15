import CustomError from '../../src/exceptions/CustomError';
import { ERROR_HEADER } from '../../src/constants/error.js';

describe('CustomError', () => {
  describe('constructor', () => {
    test('인자 없이 CustomError 인스턴스를 생성하면 name은 CustomError, 메시지는 `[ERROR] 예상치 못한 오류입니다. `', () => {
      // given
      // when
      const error = new CustomError();

      // then
      expect(error.name).toBe('CustomError');
      expect(error.message).toBe('[ERROR] 예상치 못한 오류입니다.');
    });

    test('인자로 name을 전달하면 name은 전달한 값이다', () => {
      // given
      const name = 'name';

      // when
      const error = new CustomError(undefined, name);

      // then
      expect(error.name).toBe(name);
    });

    test(`message를 넣으면 헤더 ${ERROR_HEADER}와 함께 출력된다`, () => {
      // given
      const message = 'message';

      // when
      const error = new CustomError(message);

      // then
      expect(error.message).toBe(`${ERROR_HEADER} ${message}`);
    });
  });
});
