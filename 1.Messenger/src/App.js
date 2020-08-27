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

  useEffect(() => {
    //setUsername(prompt('Please enter your name'));
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
      <img src="https://en.facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=64&h=64" alt="Messenger logo"/>
      <h1>Hello Force Of Code</h1>

      <CustomInput/>

      {/* messages themselves */}

      <FlipMove className={classes.app__messages}>
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
