import { setShowOverlay } from "../store/actions";
import store from "../store/store";
import * as wss from "./wss.js";

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      console.log("successfuly received local stream");
      localStream = stream;
      showLocalVideoPreivew(localStream);

      //dispatch an action to hide overlay
      store.dispatch(setShowOverlay(false));

      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((err) => {
      console.log(
        "error occurred when trying to get an access to local stream"
      );
      console.log(err);
    });
};

const showLocalVideoPreivew = (stream) => {
  //show local video preview
};
