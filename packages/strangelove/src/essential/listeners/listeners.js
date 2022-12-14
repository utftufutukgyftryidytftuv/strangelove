class Listeners {
  listeners = [];
  subscribe(func) {
    this.listeners.push(func);
    return () => this.unsubscribe(func);
  }
  unsubscribe(func) {
    this.listeners = this.listeners.filter((compFunc) => func !== compFunc);
  }
  trigger(data) {
    this.listeners.forEach((listener) => listener(data));
  }
}

export default Listeners;
