import './Participans.css';
import WebComponent from '../WebComponent';

export default class Participants extends WebComponent {
  constructor(author) {
    super('div', {
      class: 'chat-participants',
    });
    this.author = author;
    this.participantsContainer = null;

    this.updateParticipants = this.updateParticipants.bind(this);

    this.addContent();
  }

  addContent() {
    this.participantsContainer = new WebComponent('ul', {
      class: 'participants-list',
    });

    this.participantsContainer.appendToComponent(this);
  }

  updateParticipants(participants) {
    this.participantsContainer.removeAllContent();

    participants.forEach((participant) => {
      if (participant !== this.author) {
        this.addParticipant(participant);
      }
    });

    this.addParticipant('You');
  }

  addParticipant(participant) {
    const item = new WebComponent('li', {
      class: 'participant',
      text: participant,
    });

    if (participant === 'You') {
      item.addClass('you');
    }

    item.appendToComponent(this.participantsContainer);
  }
}
