import React from "react";
import ParticipantsSections from "./ParticipantsSection/ParticipantsSections";
import VideoSection from "./VideoSection/VideoSection";
import ChatSection from "./ChatSection/ChatSection";
import RoomLabel from "./RoomLabel";
import { connect } from "react-redux";

import "./RoomPage.css";

const RoomPage = ({ roomId }) => {
  return (
    <div className="room_container">
      <ParticipantsSections />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);
