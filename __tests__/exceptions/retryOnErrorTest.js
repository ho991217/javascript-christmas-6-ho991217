import retryOnError from '../../src/exceptions/retryOnError';
import CustomError from '../../src/exceptions/CustomError';
import { ERROR_MESSAGE } from '../../src/constants';

describe('retryOnError', () => {
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
  });

  test('정상적인 함수 호출 시 성공적으로 결과 반환', async () => {
    // given
    mockFn.mockResolvedValue('성공');

    // when
    const result = retryOnError(mockFn);

    // then
    await expect(result).resolves.toBe('성공');
  });

  test('CustomError 발생 시 지정된 횟수만큼 재시도 후 성공', async () => {
    let callCount = 0;
    // given
    mockFn.mockImplementation(() => {
      callCount++;
      if (callCount < 3) {
        throw new CustomError('일시적 에러');
      }
      return '성공';
    });

    // when
    const result = retryOnError(mockFn, 3);

    // then
    await expect(result).resolves.toBe('성공');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test('최대 재시도 회수 초과 시 CustomError(ERROR_MESSAGE.MAXIMUM_TRY) 발생', async () => {
    // given
    mockFn.mockImplementation(() => {
      throw new CustomError('일시적 에러');
    });

    // when
    const result = retryOnError(mockFn, 2);

    // then
    await expect(result).rejects.toThrow(ERROR_MESSAGE.MAXIMUM_TRY);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test('CustomError가 아닌 다른 에러 발생 시 바로 에러 반환', async () => {
    const error = new Error('다른 유형의 에러');
    // given
    mockFn.mockImplementation(() => {
      throw error;
    });

    // when
    const result = retryOnError(mockFn);

    // then
    await expect(result).rejects.toThrow(error);
  });
});
