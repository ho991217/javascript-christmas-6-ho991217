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
   * 사용자로부터 방문 예정일을 입력받고
   *
   * 유효성을 검사하는 메소드
   * @returns {Promise<string>}
   */
  inputExpectedDateOfVisit = async () => {
    const userInput = await this.#inputView.readDate();
    const validDate = this.#inputService.validate(userInput, 'date');

    return validDate;
  };

  /**
   * 사용자로부터 메뉴를 입력받고
   *
   * 유효성을 검사하는 메소드
   * @returns {Promise<string>}
   */
  inputMenu = async () => {
    const userInput = await this.#inputView.readMenu();
    const validMenu = this.#inputService.validate(userInput, 'menu');

    return validMenu;
  };
}

export default InputController;
