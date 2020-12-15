import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY        = "EMPTY";
  const SHOW         = "SHOW";
  const CREATE       = "CREATE";
  const SAVING       = "SAVING";
  const DELETING     = "DELETING";
  const CONFIRM      = "CONFIRM";
  const EDIT         = "EDIT";
  const ERROR_SAVE   = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const saveAppointment = function(name, interviewer) {
    transition(SAVING);
    
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));

  };

  const deleteAppointment = function() {
    transition(DELETING, true);
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));

  };

  return <article className="appointment" data-testid="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT) }
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={interviewers}
        onSave={saveAppointment}
        onCancel={() => back()}
      />
    )}
    {mode === SAVING && (
      <Status message="Saving" />
    )}
    {mode === DELETING && (
      <Status message="Deleting" />
    )}
    {mode === CONFIRM && (
      <Confirm 
      message="Are you sure you would like to delete?"
      onConfirm={deleteAppointment}
      onCancel={() => back()}
      />
    )}
    {mode === EDIT && (
      <Form
        name={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={interviewers}
        onSave={saveAppointment}
        onCancel={() => back()}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error
        message="Couldn't save the appointment." 
        onClose={() => back()}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message="Couldn't delete the appointment." 
        onClose={() => back()}
      />
    )}
  </article>;

};