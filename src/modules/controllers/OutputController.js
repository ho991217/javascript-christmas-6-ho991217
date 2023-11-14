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
    this.#showTotalBenfitPrice();
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
    const benfitList = this.#eventService.getBenfitList();
    const formatted = benfitList.map(([name, price]) => Format.benfit(name, price));
    if (formatted.length === 0) {
      this.#outputView.printEmptyWithTitle('혜택 내역');
      return;
    }

    this.#outputView.printWithTitle('혜택 내역', ...formatted);
  }

  #showTotalBenfitPrice() {
    const totalBenfitPrice = this.#eventService.getTotalBenfitPrice();
    this.#outputView.printWithTitle('총혜택 금액', Format.money(-totalBenfitPrice));
  }
}

export default OutputController;
