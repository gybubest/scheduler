import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  // Utilize the Application with useState, bookInterview and cancelInterview functions

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
      // Update the appointments with received information
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      // Update the days
      const days = changeRemainingSpot(true, state, id);

      setState({
        ...state, days, appointments
      });
    });
    
  };

  const cancelInterview = (id) => {
    // Set the appointment to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      // Update the appointments
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        // Update the days
        const days = changeRemainingSpot(false, state, id);

        setState({
          ...state, days, appointments
        });

    });
    
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    }).catch((err) => {
      console.log(err);
    });;

  }, []);

  return { state, setDay, bookInterview, cancelInterview };

};

// Change remaining spots only when adding or deleting appointments
const changeRemainingSpot = (book, state, id) => {
  const change = book? -1 : 1;
  let days = [...state.days];
  // Update remaining spots in days only when creating new interviews or deleting existing interviews
  if (state.appointments[id]["interview"] === null || change === 1) {
    for (let day of days) {
      if (day.appointments.includes(id)) {
        const dayId = days.indexOf(day);
        const newDay = {
          ...day,
          spots: day.spots + change
        };
        days.splice(dayId, 1, newDay);
      }
    }
  } 
  return days;

};
