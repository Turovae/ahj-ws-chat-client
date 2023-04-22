import EntryForm from './components/EntryForm/EntryForm';
import WSService from './utils/WSService';

// import Chat from './components/Chat/Chat';

const wsService = new WSService();
const entryForm = new EntryForm(wsService);
console.log(entryForm);
entryForm.appendToDOM('.app');

// const chat = new Chat();
// chat.appendToDOM('.app');
