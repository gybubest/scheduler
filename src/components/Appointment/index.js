import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  
  const {time, interview} = props;

  return <article className="appointment">
    <Header time={time}/>
    {interview && (
      <Show student={interview.student} interviewer={interview.interviewer.name} />
    )}

    {!interview && (
      <Empty />
    )}
  </article>;

};