import retryOnError from './exceptions/retryOnError.js';
import { InputView, OutputView } from './modules/views/index.js';
import { DateModel, OrderModel, MenuModel } from './modules/models/index.js';
import { InputController, OutputController } from './modules/controllers/index.js';
import { InputService, OutputService } from './modules/services/index.js';

class App {
  #inputController;

  #outputController;

  #expectedVisitingDate;

  #menu;

  constructor() {
    const inputService = new InputService(DateModel, OrderModel, MenuModel);
    const outputService = new OutputService();

    this.#inputController = new InputController(inputService, InputView);
    this.#outputController = new OutputController(outputService, OutputView);
  }

  async run() {
    await this.#getUserInput();
  }

  async #getUserInput() {
    this.#outputController.greetCustomer();
    this.#expectedVisitingDate = await retryOnError(this.#inputController.inputExpectedDateOfVisit);
    this.#menu = await retryOnError(this.#inputController.inputMenu);
  }
}

export default App;
