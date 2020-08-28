import React, { 
  useState,
  useEffect,
  useRef
} from 'react';
import './App.css';
import FlipMove from 'react-flip-move';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Firebase
import db from './Firebase/firebase';

// Components
import Header from './Components/Header/Header';
import Message from './Components/Chat/Message';
import CustomInput from './Components/Input/CustomInput';

// MUI Stuff
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  app__messages: {
    height: '70vh',
    overflow: 'auto',
    marginTop: 10,
    marginBottom: 10
  }
}));

const App = (props) => {
  const classes = useStyles();

  const { ui } = props;
  const { messages } = props;
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="App">
      <Header />
      <CustomInput username={ui.username}/>

      <div className={classes.app__messages}>
        <FlipMove>
          {
            messages && messages.map((message) => (
              <Message key={message.id} username={ui.username} message={message} />
            ))
          }
        </FlipMove>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ui: state.ui,
  messages: state.firestore.ordered.messages
});

export default compose(
  firestoreConnect(() => [
    {
      collection: 'messages',
      orderBy: ['timestamp', 'asc']
    }
  ]),
  connect(mapStateToProps, {})
)(App);
