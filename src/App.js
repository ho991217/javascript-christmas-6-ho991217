import retryOnError from './exceptions/retryOnError.js';
import { InputView, OutputView } from './modules/views/index.js';
import { DateModel, OrderModel, MenuModel, EventModel } from './modules/models/index.js';
import { InputController, OutputController } from './modules/controllers/index.js';
import { EventService, InputService, OutputService } from './modules/services/index.js';

class App {
  #inputController;

  #outputController;

  constructor() {
    const orderModel = new OrderModel();

    const inputService = new InputService(DateModel, orderModel, MenuModel);
    const outputService = new OutputService(DateModel, orderModel, MenuModel);
    const eventService = new EventService(orderModel, EventModel);

    this.#inputController = new InputController(inputService, InputView);
    this.#outputController = new OutputController(outputService, OutputView, eventService);
  }

  async run() {
    await this.#getUserInput();
    this.#showPreview();
  }

  async #getUserInput() {
    this.#outputController.greetCustomer();
    await retryOnError(this.#inputController.inputExpectedDateOfVisit);
    await retryOnError(this.#inputController.inputMenu);
  }

  #showPreview() {
    this.#outputController.showTotalBenefit();
  }
}

export default App;
