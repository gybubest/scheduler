import React, { useState } from 'react'
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import PropTypes from 'prop-types';

export default function Form(props) {
  const {interviewers, onSave, onCancel} = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewer) {
      setError("Interviewer not chosen");
      return;
    }
    setError("");
    onSave(name, interviewer);
  };
  
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const save = () => {
    validate();
    reset();
  };


  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          data-testid="student-name-input" 
          className="appointment__create-input text--semi-bold"
          name="name"
          value={name}
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList interviewers={interviewers} value={interviewer} onChange={(id) => setInterviewer(id)} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={save}>Save</Button>
      </section>
    </section>
  </main>

};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
