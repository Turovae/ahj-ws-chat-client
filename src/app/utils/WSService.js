export default class WSService {
  constructor() {
    this.port = 7070;
    this.host = 'localhost';

    this.openListener = null;
    this.errorListener = null;
    this.messageListener = null;
    this.closeListener = null;

    this.ws = new WebSocket(`ws://${this.host}:${this.port}`);
  }

  send(message) {
    console.log(message);
    console.log(this.ws);
    this.ws.send(message);
  }

  addListener(type, callback) {
    console.log('listener');
    this.ws.addEventListener(type, callback);
  }

  removeListener(type, callback) {
    this.ws.removeEventListener(type, callback);
  }
}
