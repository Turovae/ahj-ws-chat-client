import './Message.css';
import moment from 'moment/moment';
import WebComponent from '../WebComponent';

export default class Message extends WebComponent {
  constructor() {
    super('li', {
      class: 'message',
    });
  }

  addContent(props) {
    this.createHeader(props.author, props.created);
    this.createBody(props.message);
  }

  createHeader(author, created) {
    const header = new WebComponent('div', {
      class: 'message-header',
    });

    header.appendToComponent(this);

    const messageAuthor = new WebComponent('span', {
      class: 'mesage-author',
      text: author,
    });
    header.insertComponent(messageAuthor);

    header.insertText(', ');

    const messageCreated = new WebComponent('span', {
      class: 'message-created',
      text: moment(created).format('HH:mm DD.MM.YYYY'),
    });
    header.insertComponent(messageCreated);

    header.appendToComponent(this);
  }

  createBody(message) {
    const body = new WebComponent('p', {
      class: 'message-body',
      text: message,
    });
    body.appendToComponent(this);
  }
}
