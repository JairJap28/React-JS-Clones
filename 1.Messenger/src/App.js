import React, { 
  useState,
  useEffect,
  useRef
} from 'react';
import './App.css';
import FlipMove from 'react-flip-move';

// Firebase
import db from './Firebase/firebase';

// Components
import Message from './Components/Chat/Message';
import CustomInput from './Components/Input/CustomInput';

// MUI Stuff
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  app__messages: {
    height: '55vh',
    overflow: 'auto'
  }
}));

const App = () => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    //setUsername(prompt('Please enter your name'));
  }, []);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, []);

  return (
    <div className="App">
      <img src="https://en.facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=64&h=64" alt="Messenger logo"/>
      <h1>Hello Force Of Code</h1>

      <CustomInput/>

      {/* messages themselves */}

      <div className={classes.app__messages}>
        <FlipMove>
          {
            messages.map(({ id, message }) => (
              <Message key={id} username={username} message={message} />
            ))
          }
        </FlipMove>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default App;
