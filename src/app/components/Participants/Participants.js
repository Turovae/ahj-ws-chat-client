import './Participans.css';
import WebComponent from '../WebComponent';

export default class Participants extends WebComponent {
  constructor() {
    super('div', {
      class: 'chat-participants',
    });

    this.participants = ['Alexandra', 'Ivan', 'Vasily', 'You'];
    this.participantsContainer = null;

    this.addContent();
  }

  addContent() {
    this.participantsContainer = new WebComponent('ul', {
      class: 'participants-list',
    });

    this.participantsContainer.appendToComponent(this);

    this.updateParticipants(this.participants);
  }

  updateParticipants(participants) {
    this.participantsContainer.removeAllContent();

    participants.forEach((participant) => {
      this.addParticipant(participant);
    });
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
