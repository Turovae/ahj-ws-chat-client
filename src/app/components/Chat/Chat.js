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

    // this.addContent();
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
    return message.author === this.author;
  }

  submitMessage(event) {
    if (event.key !== 'Enter') {
      return;
    }

    if (this.inputComponent.value) {
      const message = this.inputComponent.value;

      this.addMessage({
        author: this.author,
        created: new Date(),
        message,
      });
      this.inputComponent.value = '';
    }
    console.log(this.owner);
  }

  updateParticipants(participants) {
    this.participantsComponent.updateParticipants(participants);
  }
}
