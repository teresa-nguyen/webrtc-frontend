import React, { useState } from 'react';
import * as webRTCHandler from '../../utils/webRTCHandler';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import { Grid, Button, Stack } from '@mui/material';
import LocalScreenSharingPreview from './LocalScreenSharingPreview';

const constraints = {
  audio: false,
  video: true,
};

const VideoSection = () => {
  // Mic button
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);

    setIsMicMuted(!isMicMuted);
  };

  // Video button
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisabled);

    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };

  // Leave button
  const handleRoomDisconnection = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  // Screen share button
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          'error occured when trying to get an access to screen share stream'
        );
        console.log(err);
      }
      if (stream) {
        setScreenSharingStream(stream);

        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);

      setIsScreenSharingActive(false);

      //stop screen share stream
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <Grid container style={{ alignSelf: 'flex-end' }}>
      <Grid item xs={12}>
        {isScreenSharingActive && (
          <LocalScreenSharingPreview stream={screenSharingStream} />
        )}
      </Grid>
      <Grid item xs={2}>
        <Button
          size='large'
          variant='contained'
          color='error'
          onClick={handleRoomDisconnection}
        >
          LEAVE
        </Button>
      </Grid>
      <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction='row' spacing={2}>
          <Button
            size='large'
            variant='outlined'
            onClick={handleMicButtonPressed}
          >
            {isMicMuted ? (
              <MicOffIcon fontSize='large' />
            ) : (
              <MicIcon fontSize='large' />
            )}
          </Button>
          <Button
            size='large'
            variant='outlined'
            onClick={handleCameraButtonPressed}
          >
            {isLocalVideoDisabled ? (
              <VideocamOffIcon fontSize='large' />
            ) : (
              <VideocamIcon fontSize='large' />
            )}
          </Button>
          <Button
            size='large'
            variant='outlined'
            onClick={handleScreenShareToggle}
          >
            {isScreenSharingActive ? (
              <StopScreenShareIcon fontSize='large' />
            ) : (
              <ScreenShareIcon fontSize='large' />
            )}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default VideoSection;
