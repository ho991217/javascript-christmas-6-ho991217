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
    this.#outputView.previewBenefit(this.#eventService.getVisitDate());

    this.#showOrdered();
    this.#showTotalPriceBeforeDiscount();
    this.#showGift();
    this.#showBenefitList();
    this.#showTotalBenefitPrice();
    this.#showTotalPriceAfterDiscount();
    this.#showBadge();
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
      Format.money(this.#outputService.getTotalPriceBeforeDiscount()),
    );
  }

  #showGift() {
    this.#outputView.printWithTitle('증정 메뉴', this.#eventService.getGift());
  }

  #showBenefitList() {
    const benefitList = this.#eventService.getBenefitList();
    const formatted = benefitList.map(({ name, value }) => Format.benefit(name, value));
    if (formatted.length === 0) {
      this.#outputView.printEmptyWithTitle('혜택 내역');
      return;
    }

    this.#outputView.printWithTitle('혜택 내역', ...formatted);
  }

  #showTotalBenefitPrice() {
    const totalBenefitPrice = this.#eventService.getTotalBenefitPrice();
    this.#outputView.printWithTitle('총혜택 금액', Format.money(-totalBenefitPrice));
  }

  #showTotalPriceAfterDiscount() {
    const totalPriceAfterDiscount = this.#eventService.getTotalPriceAfterDiscount();
    this.#outputView.printWithTitle(
      '할인 후 예상 결제 금액',
      Format.money(totalPriceAfterDiscount),
    );
  }

  #showBadge() {
    const badge = this.#eventService.getBadge();

    this.#outputView.printWithTitle('12월 이벤트 배지', badge);
  }
}

export default OutputController;
