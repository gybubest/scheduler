import { useState, useEffect } from "react";
const axios = require("axios");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state, appointments
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
    
        setState({
          ...state, appointments
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
