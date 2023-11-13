import Input from './modules/input/Input.js';
import retryOnError from './exceptions/retryOnError.js';

class App {
  // eslint-disable-next-line class-methods-use-this
  async run() {
    const date = await retryOnError(Input.inputExpectedDateOfVisit);
    console.log(date);
  }
}

export default App;
