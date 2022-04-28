import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setIsRoomHost } from '../store/actions';
import './IntroductionPage.css';
import {
  Container,
  Stack,
  Button,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

const IntroductionPage = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  }, []);

  let history = useHistory();

  const pushToJoinRoomPage = () => {
    history.push('/join-room');
  };

  const pushToJoinRoomPageAsHost = () => {
    history.push('/join-room?host=true');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Container maxWidth='sm'>
        <Paper elevation={12} style={{ padding: '24px 120px' }}>
          <Typography variant='h3' component='h1' textAlign='center' pb={6}>
            Meeting
          </Typography>
          <Stack spacing={2}>
            <Button variant='contained' onClick={pushToJoinRoomPage}>
              Join a meeting
            </Button>
            <Button variant='outlined' onClick={pushToJoinRoomPageAsHost}>
              Host a meeting
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapActionsToProps)(IntroductionPage);
