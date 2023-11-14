/**
 * @typedef {import('../views/OutputView').OutputView} OutputView
 * @typedef {import('../services/OutputService').OutputService} OutputService
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
    this.#outputView.previewBenfit();
    this.#outputView.printWithTitle('주문 메뉴', ...this.#outputService.getOrderedMenuList());
  }

  greetCustomer() {
    this.#outputView.greet();
  }

  // showOrdered() {}
}

export default OutputController;
