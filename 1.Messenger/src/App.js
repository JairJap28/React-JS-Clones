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
      setMessages(snapshot.docs.map(doc => doc.data()))
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
      <h1>Hello Force Of Code</h1>

      <form>
        <FormControl>
          <InputLabel >Enter a message</InputLabel>
          <Input 
            value={input} 
            onChange={event => setInput(event.target.value)}/>
          <Button
            variant="contained"
            color="primary"
            type='submit'
            disabled={!input}
            onClick={sendMessage}>
            Send Message
        </Button>
        </FormControl>
      </form>

      {/* messages themselves */}

      <FlipMove>
        {
          messages.map(message => (
            <Message username={username} message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
