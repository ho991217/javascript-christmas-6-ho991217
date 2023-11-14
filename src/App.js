import retryOnError from './exceptions/retryOnError.js';
import { DateModel, OrderModel, MenuModel } from './modules/models/index.js';
import InputController from './modules/controllers/InputController.js';
import InputService from './modules/services/InputService.js';
import InputView from './modules/views/InputView.js';

class App {
  #inputController;

  constructor() {
    const inputService = new InputService(DateModel, OrderModel, MenuModel);
    this.#inputController = new InputController(inputService, InputView);
  }

  async run() {
    const expectedVisitingDate = await retryOnError(this.#inputController.inputExpectedDateOfVisit);
    const menu = await retryOnError(this.#inputController.inputMenu);

    console.log(expectedVisitingDate);
    console.log(menu);
  }
}

export default App;
