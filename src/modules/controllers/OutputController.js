/**
 * @typedef {import('../views/OutputView').OutputView} OutputView
 */

class OutputController {
  #outputService;

  #outputView;

  /**
   *
   * @param {OutputService} outputService
   * @param {OutputView} outputView
   */
  constructor(outputService, outputView) {
    this.#outputService = outputService;
    this.#outputView = outputView;
  }

  greetCustomer() {
    this.#outputView.greet();
  }
}

export default OutputController;
