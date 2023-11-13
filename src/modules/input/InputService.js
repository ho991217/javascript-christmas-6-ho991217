class InputService {
  #inputModel;

  constructor(inputModel) {
    this.#inputModel = inputModel;
  }

  /**
   * @param {string} input
   * @param {'date' | 'menu'} type
   * @returns {string | null}
   */
  validate(input, type) {
    switch (type) {
      case 'date':
        return this.#validateDateInput(input);
      case 'menu':
        return null;
      default:
        return null;
    }
  }

  #validateDateInput(input) {
    if (!this.#inputModel.isPositiveInteger(input)) {
      throw new Error('Input must be an integer.');
    }

    return input;
  }
}

export default InputService;
