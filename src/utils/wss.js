import io from 'socket.io-client';
import { setRoomId, setParticipants, setMessages } from '../store/actions';
import store from '../store/store';
import * as webRTCHandler from './webRTCHandler';

const SERVER = '/';

let socket = null;

export const connectWithSockIOServer = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
    console.log('successfully connected with socket io server');
    console.log(socket.id);
  });

  socket.on('room-id', (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on('room-update', (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on('conn-prepare', (data) => {
    const { connUserSocketId } = data;
    console.log('on conn-prepare', data);
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    //inform the user which just join the room that we have prepared for incoming connection
    socket.emit('conn-init', { connUserSocketId: connUserSocketId });
  });

  socket.on('conn-signal', (data) => {
    console.log('on conn-signal', data);
    webRTCHandler.handleSignalingData(data);
  });

  socket.on('conn-init', (data) => {
    console.log('on conn-init', data);
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on('user-disconnected', (data) => {
    console.log('on user-disconnected');
    webRTCHandler.removePeerConnection(data);
  });

  socket.on('msg-broadcast', (data) => {
    console.log('on msg-broadcast');
    appendNewMessage(data);
  });
};

export const createNewRoom = (identity) => {
  //emit an event to server that we would like to create new room
  const data = {
    identity,
  };
  socket.emit('create-new-room', data);
};

export const joinRoom = (identity, roomId) => {
  //emit an event to server that we would like to join a room
  const data = {
    roomId,
    identity,
  };

  socket.emit('join-room', data);
};

export const signalPeerData = (data) => {
  console.log('emiting conn-signal', data);
  socket.emit('conn-signal', data);
};

/////////////////////////// Messages /////////////////////////////
const appendNewMessage = (messageData) => {
  const messages = store.getState().messages;
  store.dispatch(setMessages([...messages, messageData]));
};

export const sendMessage = (messageContent) => {
  //append this message locally
  const identity = store.getState().identity;

  const messageData = {
    content: messageContent,
    identity,
  };

  appendNewMessage({ ...messageData, messageCreatedByMe: true });

  socket.emit('msg-sent', messageData);
};
