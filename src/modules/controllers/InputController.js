/**
 * @typedef {import('../services/InputService').InputService} InputService
 * @typedef {import('../modules/view/InputView').InputView} InputView
 */

class InputController {
  #inputView;

  #inputService;

  /**
   * @param {InputService} inputService
   * @param {InputView} inputView
   */
  constructor(inputService, inputView) {
    this.#inputView = inputView;
    this.#inputService = inputService;
  }

  /**
   * 사용자로부터 방문예정일을 입력받는 메소드
   *
   * @method
   * @name inputExpectedDateOfVisit
   * @returns {string}
   */
  inputExpectedDateOfVisit = async () => {
    const userInput = await this.#inputView.readDate();
    const validDate = this.#inputService.process(userInput, 'date');

    return validDate;
  };

  /**
   * 사용자로부터 메뉴를 입력받는 메소드
   *
   * @method
   * @name inputMenu
   * @returns {string}
   */
  inputMenu = async () => {
    const userInput = await this.#inputView.readMenu();
    const validMenu = this.#inputService.process(userInput, 'menu');

    return validMenu;
  };
}

export default InputController;
