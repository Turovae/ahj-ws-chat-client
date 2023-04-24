import './Chat.css';
import WebComponent from '../WebComponent';
import Participants from '../Participants/Participants';
import Message from '../Message/Message';

export default class Chat extends WebComponent {
  constructor(author) {
    super('div', {
      class: 'chat',
    });

    this.author = author;

    this.participantsComponent = null;
    this.messagesComponent = null;
    this.inputComponent = null;

    this.server = null;

    this.submitMessage = this.submitMessage.bind(this);
  }

  addContent() {
    this.participantsComponent = new Participants(this.author);
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
  }

  addMessages(messages) {
    messages.forEach((message) => {
      this.addMessage(message);
    });
  }

  addMessage(msg) {
    const msgComponent = new Message();
    if (this.isOwner(msg)) {
      msgComponent.addClass('you-message');
      // eslint-disable-next-line no-param-reassign
      msg.author = 'You';
    }
    msgComponent.addContent(msg);
    msgComponent.appendToComponent(this.messagesComponent);
    this.inputComponent.value = '';

    this.messagesComponent.scrollToEnd();
  }

  isOwner(message) {
    return message.author === this.author;
  }

  submitMessage(event) {
    if (event.key !== 'Enter') {
      return;
    }

    if (this.inputComponent.value) {
      const message = this.inputComponent.value;

      const msg = {
        type: 'message',
        author: this.author,
        body: message,
      };

      this.server.sendData(msg);
    }
  }

  updateParticipants(participants) {
    if (this.participantsComponent) {
      this.participantsComponent.updateParticipants(participants);
    }
  }
}
