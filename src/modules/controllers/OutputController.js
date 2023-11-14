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

  showTotalBenefit() {
    const totalBenefit = this.#outputService.getTotalBenefit();
    this.#outputView.showTotalBenefit(totalBenefit);
  }

  greetCustomer() {
    this.#outputView.greet();
  }

  #showOrdered() {

  }
}

export default OutputController;
