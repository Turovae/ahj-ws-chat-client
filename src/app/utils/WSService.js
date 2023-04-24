export default class WSService {
  constructor(entryForm, chat) {
    this.port = 7070;
    this.host = 'chat-server-dtzb.onrender.com';
    this.author = null;

    this.entryForm = entryForm;
    this.chat = chat;
    this.connect = false;

    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this.ws = new WebSocket(`wss://${this.host}`);

    this.ws.addEventListener('message', this.getData);

    window.addEventListener('beforeunload', this.disconnect);
  }

  send(message) {
    this.ws.send(message);
  }

  getData(msg) {
    const response = JSON.parse(msg.data);
    if (response.ok) {
      if (response.type === 'connection') {
        if (response.author === this.author) {
          this.entryForm.openChat(response);
          this.entryForm = null;
          this.connect = true;
        }

        if (this.chat && this.chat.updateParticipants) {
          this.chat.updateParticipants(response.authors);
        }
      }

      if (!this.connect) {
        return;
      }

      if (response.type === 'disconnect') {
        if (this.chat && this.chat.updateParticipants) {
          this.chat.updateParticipants(response.authors);
        }
      }

      if (response.type === 'message') {
        this.chat.addMessage(response);
      }
    } else {
      this.entryForm.showMessage(response.statusMessage);
    }
  }

  sendData(msg) {
    this.author = msg.author;
    this.ws.send(JSON.stringify(msg));
  }

  disconnect() {
    if (this.author) {
      const msg = {
        type: 'disconnect',
        author: this.author,
      };

      this.sendData(msg);
    }
  }
}
