class InputController {
  /**
   * @param {InputService} inputService
   * @param {InputView} inputView
   */
  constructor(inputService, inputView) {
    this.inputView = inputView;
    this.inputService = inputService;
  }

  async inputExpectedDateOfVisit() {
    const input = await this.inputView.readDate();
    const date = this.inputService.validate(input, 'date');

    return date;
  }
}

export default InputController;
