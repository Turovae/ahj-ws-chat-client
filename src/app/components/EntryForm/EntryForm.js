import './EntryForm.css';
import WebComponent from '../WebComponent';

export default class EntryForm extends WebComponent {
  constructor() {
    super();
    this.form = null;
    this.wrapper = null;
    this.input = null;
    this.btn = null;

    this.appendToChat = this.appendToChat.bind(this);

    this.create();
  }

  create() {
    this.wrapper = new WebComponent('div', {
      class: 'wrapper',
      // text: 'this is wrapper',
    });

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

    this.form.registerListener('submit', this.appendToChat);
  }

  appendToDOM(container) {
    this.wrapper.appendToDOM(container);
  }

  appendToChat(event) {
    event.preventDefault();
    const { value } = this.input;
    this.input.value = '';

    setTimeout(() => {
      this.wrapper.remove();

      const div = new WebComponent('div', {
        text: value,
      });

      div.appendToDOM('.app');
    }, 1500);
  }
}
