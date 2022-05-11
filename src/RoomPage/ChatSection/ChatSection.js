import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as wss from '../../utils/wss.js';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  TextField,
  Box,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatSection = ({ messages }) => {
  const [message, setMessage] = useState('');

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      wss.sendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      <Typography variant='h6' component='h2'>
        CHAT
      </Typography>
      <List dense={true}>
        {messages.map((message, index) => {
          const sameAuthor =
            index > 0 && message.identity === messages[index - 1].identity;
          return (
            <>
              <ListItem key={`${message.content}${index}`}>
                <Chip
                  style={{
                    marginRight: 8,
                    visibility: sameAuthor ? 'hidden' : 'visible',
                  }}
                  label={message.messageCreatedByMe ? 'You' : message.identity}
                />
                <ListItemText primary={message.content} />
              </ListItem>
            </>
          );
        })}
      </List>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <form onSubmit={sendMessage}>
          <TextField
            onChange={handleTextChange}
            value={message}
            id='input-with-sx'
            variant='standard'
            placeholder='Type your message...'
          />
          <Button variant='contained' endIcon={<SendIcon />} type='submit'>
            Send
          </Button>
        </form>
      </Box>
    </>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(ChatSection);
