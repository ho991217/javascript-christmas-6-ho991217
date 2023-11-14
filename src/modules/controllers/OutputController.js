import Format from '../../utils/Format.js';
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

    this.#showOrdered();
    this.#showTotalPriceBeforeDiscount();
  }

  greetCustomer() {
    this.#outputView.greet();
  }

  #showOrdered() {
    this.#outputView.printWithTitle('주문 메뉴', ...this.#outputService.getOrderedMenuList());
  }

  #showTotalPriceBeforeDiscount() {
    this.#outputView.printWithTitle(
      '할인 전 총주문 금액',
      Format.money(this.#outputService.getTotalPriceBeforeDiscount())
    );
  }
}

export default OutputController;
