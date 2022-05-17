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
        <Typography variant='h6' component='h2' style={{ paddingLeft: 16 }}>
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
      <Grid item xs={6} style={{ display: 'flex' }}>
        <Grid container>
          <Grid
            item
            xs={12}
            id='videos_portal'
            style={{ display: 'flex', flexWrap: 'wrap' }}
          ></Grid>
          <VideoSection />
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
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
