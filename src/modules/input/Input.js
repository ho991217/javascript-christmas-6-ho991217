import InputController from './InputController.js';
import InputModel from './InputModel.js';
import InputView from './InputView.js';
import InputService from './InputService.js';

const inputService = new InputService(InputModel);
const Input = new InputController(inputService, InputView);

export default Input;
