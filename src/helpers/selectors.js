export function getAppointmentsForDay(state, day) {
  let filteredAppointments = [];

  const dayList = (state.days.filter(oneDay => oneDay.name === day));
  if (dayList[0]) {
    filteredAppointments = dayList[0].appointments.map(id => state.appointments[id]);
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
  if (dayList[0] && dayList[0].interviewers) {
    filteredInterviewers = dayList[0].interviewers.map(id => state.interviewers[id]);

  }
  return filteredInterviewers;
};