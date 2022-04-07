import React from "react";

const dummyParticipants = [
  {
    identity: "Jake",
  },
  {
    identity: "Anna",
  },
  {
    identity: "Marek",
  },
  {
    identity: "Darius",
  },
];

const SingleParticipant = (props) => {
  const { identity, lastItem, participant } = props;

  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <hr style={{ marginLeft: 40 }} />}
    </>
  );
};

const Participants = () => {
  return (
    <div callsName="participants_container">
      {dummyParticipants.map((participant, index) => {
        return (
          <SingleParticipant
            key={participant.identity}
            lastItem={dummyParticipants.length === index + 1}
            participant={participant}
            identity={participant.identity}
          />
        );
      })}
    </div>
  );
};

export default Participants;
