export default class WSService {
  constructor(entryForm, chat) {
    this.port = 7070;
    this.host = 'localhost';
    this.author = null;

    this.entryForm = entryForm;
    this.chat = chat;
    this.connect = false;

    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this.ws = new WebSocket(`ws://${this.host}:${this.port}`);

    this.ws.addEventListener('message', this.getData);

    window.addEventListener('beforeunload', this.disconnect);
  }

  send(message) {
    this.ws.send(message);
  }

  getData(msg) {
    const response = JSON.parse(msg.data);
    console.log(response);
    if (response.ok) {
      if (response.type === 'connection') {
        if (response.author === this.author) {
          this.entryForm.openChat(response);
          this.entryForm = null;
          this.connect = true;
        }

        if (this.connect) {
          this.chat.updateParticipants(response.authors);
        }
      }

      if (response.type === 'disconnect') {
        if (this.chat) {
          this.chat.updateParticipants(response.authors);
        }
      }
    } else {
      console.log(this.entryForm);
      this.entryForm.showMessage(response.statusMessage);
    }
  }

  sendData(msg) {
    this.author = msg.author;
    this.ws.send(JSON.stringify(msg));
  }

  disconnect() {
    console.log('dis');
    if (this.author) {
      const msg = {
        type: 'disconnect',
        author: this.author,
      };

      this.sendData(msg);
      console.log(msg);
    }
  }
}
