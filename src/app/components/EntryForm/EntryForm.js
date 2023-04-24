import './EntryForm.css';
import WebComponent from '../WebComponent';
import Chat from '../Chat/Chat';
import WSService from '../../utils/WSService';

export default class EntryForm extends WebComponent {
  constructor() {
    super();
    this.form = null;
    this.wrapper = null;
    this.input = null;
    this.btn = null;
    this.author = null;

    this.sendData = this.sendData.bind(this);

    this.create();

    this.chat = new Chat();
    this.server = new WSService(this, this.chat);
  }

  create() {
    this.wrapper = new WebComponent('div', {
      class: 'wrapper',
    });
    this.element = this.wrapper;

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

  openChat(response) {
    this.chat.author = response.author;
    this.chat.appendToDOM('.app');
    this.chat.server = this.server;
    this.chat.addContent();

    this.chat.addMessages(response.messages);
    this.remove();
  }

  sendData(event) {
    event.preventDefault();

    if (this.input.value.length < 3) {
      this.showMessage('Name is too short');
      return;
    }

    this.author = this.input.value;

    this.input.value = '';

    const msg = {
      type: 'connection',
      author: this.author,
    };

    this.server.sendData(msg);
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
