import './Chat.css';
import WebComponent from '../WebComponent';
import Participants from '../Participants/Participants';
import Message from '../Message/Message';

export default class Chat extends WebComponent {
  constructor() {
    super('div', {
      class: 'chat',
    });

    this.owner = 'Seroja';

    this.participantsComponent = null;
    this.messagesComponent = null;
    this.inputComponent = null;

    this.submitMessage = this.submitMessage.bind(this);

    this.messages = [
      {
        author: 'Alexandra',
        created: new Date(new Date() - 100000000),
        message: 'Remember Hurry number room!',
      },
      {
        author: 'Ivan',
        created: new Date(),
        message: 'I am sending message',
      },
      {
        author: 'Seroja',
        created: new Date(),
        message: 'My message',
      },
    ];

    this.addContent();
  }

  addContent() {
    this.participantsComponent = new Participants();
    this.participantsComponent.appendToComponent(this);

    this.messagesComponent = new WebComponent('ul', {
      class: 'chat-messages',
    });
    this.messagesComponent.appendToComponent(this);

    this.inputComponent = new WebComponent('input', {
      class: 'chat-input',
      type: 'text',
      placeholder: 'Type you message here',
    });
    this.inputComponent.appendToComponent(this);
    this.inputComponent.registerListener('keydown', this.submitMessage);

    this.messages.forEach((message) => {
      this.addMessage(message);
    });
  }

  addMessage(message) {
    const messageComponent = new Message();
    if (this.isOwner(message)) {
      messageComponent.addClass('you-message');
      // eslint-disable-next-line no-param-reassign
      message.author = 'You';
    }
    messageComponent.addContent(message);
    messageComponent.appendToComponent(this.messagesComponent);
  }

  isOwner(message) {
    return message.author === this.owner;
  }

  submitMessage(event) {
    if (event.key !== 'Enter') {
      return;
    }

    if (this.inputComponent.value) {
      const message = this.inputComponent.value;

      this.addMessage({
        author: this.owner,
        created: new Date(),
        message,
      });
      this.inputComponent.value = '';
    }
  }
}
