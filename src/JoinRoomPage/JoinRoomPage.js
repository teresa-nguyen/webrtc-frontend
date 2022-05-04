import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsRoomHost, setIdentity, setRoomId } from '../store/actions';
import { useHistory } from 'react-router-dom';
import { getRoomExists } from '../utils/api';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

const JoinRoomPage = (props) => {
  const {
    setIsRoomHostAction,
    isRoomHost,
    setIdentityAction,
    setRoomIdAction,
  } = props;
  const search = useLocation().search;
  const titleText = isRoomHost ? 'Host meeting' : 'Join meeting';
  // first input
  const [roomIdValue, setRoomIdValue] = useState('');
  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.target.value);
  };
  // second input
  const [nameValue, setNameValue] = useState('');
  const handleNameValueChange = (event) => {
    setNameValue(event.target.value);
  };
  //error message
  const [errorMessage, setErrorMessage] = useState(null);
  //buttons
  const successButtonText = isRoomHost ? 'Host' : 'Join';
  const history = useHistory();
  const createRoom = () => {
    history.push('/room');
  };
  const joinRoom = async () => {
    const responseMessage = await getRoomExists(roomIdValue);

    const { roomExists, full } = responseMessage;
    if (roomExists) {
      if (full) {
        setErrorMessage('Meeting is full. Please try again later.');
      } else {
        //join a room !
        //save in our redux store meeting id which was provided by user which would like to join
        setRoomIdAction(roomIdValue);
        history.push('/room');
      }
    } else {
      setErrorMessage('Meeting not found. Check your meeting id.');
    }
  };
  const handleJoinRoom = async () => {
    setIdentityAction(nameValue);
    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const pushToIntroductionPage = () => {
    history.push('/');
  };

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get('host');
    if (isRoomHost) {
      setIsRoomHostAction(true);
    }
  }, []);

  return (
    <Container maxWidth='sm'>
      <Paper elevation={12} style={{ padding: '24px 120px' }}>
        <Typography variant='h4' component='h1'>
          {titleText}
        </Typography>
        <form>
          {!isRoomHost && (
            <TextField
              margin='normal'
              label='Enter meeting ID'
              variant='outlined'
              value={roomIdValue}
              onChange={handleRoomIdValueChange}
            />
          )}
          <TextField
            margin='normal'
            label='Enter your Name'
            variant='outlined'
            value={nameValue}
            onChange={handleNameValueChange}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              style={{ marginRight: 12 }}
              variant='contained'
              onClick={handleJoinRoom}
            >
              {successButtonText}
            </Button>
            <Button variant='outlined' onClick={pushToIntroductionPage}>
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
