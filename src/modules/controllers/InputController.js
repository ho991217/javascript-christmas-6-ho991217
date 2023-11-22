/**
 * @typedef {import('../services/InputService').InputService} InputService
 * @typedef {import('../view/InputView').InputView} InputView
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
    this.#inputService.processDateInput(userInput);
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
    this.#inputService.processMenuInput(userInput);
  };
}

export default InputController;
