export function getAppointmentsForDay(state, day) {
  let filteredAppointments = [];

  const dayList = (state.days.filter(oneDay => oneDay.name === day));
  if (dayList[0]) {
    const appointments = dayList[0].appointments;
    if (appointments) {
      for (const id of appointments) {
        filteredAppointments.push(state.appointments[id]);
      }
    }
  }
  return filteredAppointments;
  
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const student = interview.student;
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];

  return {
    student,
    interviewer
  };

};

export function getInterviewersForDay(state, day) {
  let filteredInterviewers = [];

  const dayList = (state.days.filter(oneDay => oneDay.name === day));
  if (dayList[0]) {
    const interviewers = dayList[0].interviewers;
    if (interviewers) {
      for (const id of interviewers) {
        filteredInterviewers.push(state.interviewers[id]);
      }
    }
  }
  return filteredInterviewers;
};