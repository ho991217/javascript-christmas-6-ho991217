import Input from './modules/input/Input.js';
import retryOnError from './exceptions/retryOnError.js';

class App {
  // eslint-disable-next-line class-methods-use-this
  async run() {
    const expectedVisitingDate = await retryOnError(Input.inputExpectedDateOfVisit);
    const menu = await retryOnError(Input.inputMenu);

    console.log(expectedVisitingDate);
    console.log(menu);
  }
}

export default App;
