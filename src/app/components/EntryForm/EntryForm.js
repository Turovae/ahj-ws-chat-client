import './EntryForm.css';
import WebComponent from '../WebComponent';
import Chat from '../Chat/Chat';

export default class EntryForm extends WebComponent {
  constructor(server) {
    super();
    this.form = null;
    this.wrapper = null;
    this.input = null;
    this.btn = null;

    this.server = server;

    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);

    this.server.addListener('message', this.getData);

    this.create();
  }

  create() {
    this.wrapper = new WebComponent('div', {
      class: 'wrapper',
      // text: 'this is wrapper',
    });
    this.element = this.wrapper;

    // this.wrapper.appendToDOM('.app');

    this.form = new WebComponent('form', {
      class: 'entry-form',
    });
    this.form.appendToComponent(this.wrapper);

    const formHeader = new WebComponent('h2', {
      class: 'form-header',
      text: 'Выберите псевдоним',
    });

    this.form.insertComponent(formHeader);

    this.input = new WebComponent('input', {
      class: 'form-input',
      name: 'name',
    });

    this.form.insertComponent(this.input);

    this.btn = new WebComponent('button', {
      class: 'entry-form-btn btn',
      text: 'Продолжить',
      type: 'submit',
    });
    this.form.insertComponent(this.btn);

    this.form.registerListener('submit', this.sendData);
  }

  appendToDOM(container) {
    this.wrapper.appendToDOM(container);
  }

  sendData(event) {
    event.preventDefault();
    const { value } = this.input;

    if (value.length < 3) {
      this.showMessage('Name is too short');
      return;
    }

    this.input.value = '';

    this.server.send(JSON.stringify({
      type: 'connection',
      author: value,
    }));
  }

  getData(msg) {
    const response = JSON.parse(msg.data);
    if (response.ok) {
      this.openChat(response);
    } else {
      this.showMessage(response.statusMessage);
    }
  }

  openChat(response) {
    const chat = new Chat();

    chat.owner = response.author;
    chat.appendToDOM('.app');
    chat.server = this.server;

    chat.addMessages(response.messages);
    chat.updateParticipants(response.authors);

    this.server.removeListener('message', this.getData);
    this.remove();
  }

  showMessage(msg) {
    const msgComp = new WebComponent('div', {
      class: 'error-msg',
      text: msg,
    });
    msgComp.appendToComponent(this.form);

    setTimeout(() => {
      msgComp.remove();
    }, 2000);
  }
}
