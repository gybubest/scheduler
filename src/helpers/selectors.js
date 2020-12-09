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