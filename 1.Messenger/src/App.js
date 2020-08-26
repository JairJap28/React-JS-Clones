import React, { 
  useState,
  useEffect
} from 'react';
import './App.css';
import FlipMove from 'react-flip-move';

// Firebase
import firebase from "firebase";
import db from './Firebase/firebase';

// Components
import Message from './Components/Chat/Message';

// MUI Stuff
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

// Icons
import SendIcon from '@material-ui/icons/Send';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []);

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, []);

  const sendMessage = (event) => {
    // all the logic to send the message
    event.preventDefault();

    db.collection('messages').add({ 
      username: username, 
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }

  return (
    <div className="App">
      <img src="https://en.facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="Messenger logo"/>
      <h1>Hello Force Of Code</h1>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input 
            placeholder="Enter a message..."
            value={input} 
            onChange={event => setInput(event.target.value)}
            className="app__input"/>

          <IconButton
            variant="contained"
            color="primary"
            type='submit'
            disabled={!input}
            onClick={sendMessage}
            className="app__iconButton">
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/* messages themselves */}

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
