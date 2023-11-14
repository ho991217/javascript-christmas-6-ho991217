class OutputService {
  #dateModel;

  #orderModel;

  constructor(dateModel, orderModel) {
    this.#dateModel = dateModel;
    this.#orderModel = orderModel;
  }
}

export default OutputService;
