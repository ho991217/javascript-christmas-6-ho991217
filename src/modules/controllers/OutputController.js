/* eslint-disable comma-dangle */
import Format from '../../utils/Format.js';
/**
 * @typedef {import('../views/OutputView').OutputView} OutputView
 * @typedef {import('../services/OutputService').OutputService} OutputService
 * @typedef {import('../services/EventService.js').EventService} EventService
 */

class OutputController {
  #outputService;

  #outputView;

  #eventService;

  /**
   *
   * @param {OutputService} outputService
   * @param {OutputView} outputView
   * @param {EventService} eventService
   */
  constructor(outputService, outputView, eventService) {
    this.#outputService = outputService;
    this.#outputView = outputView;
    this.#eventService = eventService;
  }

  showTotalBenefit() {
    this.#outputView.previewBenfit();

    this.#showOrdered();
    this.#showTotalPriceBeforeDiscount();
    this.#showGift();
    this.#showBenfitList();
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

  #showGift() {
    this.#outputView.printWithTitle('증정 메뉴', this.#eventService.getGift());
  }

  #showBenfitList() {
    this.#outputView.printWithTitle('혜택 내역', ...this.#eventService.getBenfitList());
  }
}

export default OutputController;
