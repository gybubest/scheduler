import { useState, useEffect } from "react";
// const axios = require("axios");
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = function(id, interview) {

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = changeRemainingSpot(true, state, id);

      setState({
        ...state, days, appointments
      });
    });
    
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

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

const changeRemainingSpot = (book, state, id) => {
  let change = 0;
  book? change-- : change++ ;
  
  let days = [...state.days];

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

  return days;
}
