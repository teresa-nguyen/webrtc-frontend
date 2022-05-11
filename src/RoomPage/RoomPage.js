import React, { useEffect } from 'react';
import VideoSection from './VideoSection/VideoSection';
import ChatSection from './ChatSection/ChatSection';
import RoomLabel from './RoomLabel';
import { connect } from 'react-redux';
import * as webRTCHandler from '../utils/webRTCHandler';
import Overlay from './Overlay';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';

import './RoomPage.css';

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  participants,
}) => {
  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {/* <ParticipantsSections /> */}
        <Typography variant='h6' component='h2'>
          PARTICIPANTS
        </Typography>
        <List>
          {participants.map((item, index) => {
            return (
              <>
                <ListItem key={item.id}>
                  <ListItemText primary={item.identity} />
                </ListItem>
                {participants.length !== index + 1 && (
                  <Divider variant='fullWidth' component='li' />
                )}
              </>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={6}>
        <VideoSection />
      </Grid>
      <Grid item xs={3}>
        <ChatSection />
      </Grid>
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </Grid>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);
