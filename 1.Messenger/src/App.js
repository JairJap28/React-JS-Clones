import React, { 
  useState,
  useEffect
} from 'react';
import './App.css';

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

  const sendMessage = (event) => {
    // all the logic to send the message
    event.preventDefault();
    setMessages([...messages, { username: username, text: input }]);
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

      {
        messages.map(message => (
          <Message username={message.username} text={message.text}/>
        ))
      }
    </div>
  );
}

export default App;
