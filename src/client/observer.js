class Observer {
  constructor(callback) {
    this.callback = callback;
  }

  update(params) {
    this.callback(params);
  }
}