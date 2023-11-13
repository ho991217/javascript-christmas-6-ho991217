import Input from './modules/input/Input.js';

class App {
  // eslint-disable-next-line class-methods-use-this
  async run() {
    const date = await Input.inputExpectedDateOfVisit();
    console.log(date);
  }
}

export default App;
