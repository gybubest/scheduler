import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setHistory([...history, mode]);
      setMode(newMode);
    }
  };

  function back() {
    if (history.length >= 1) {
      setMode(history.pop());
    }
  };

  return { mode, transition, back };

};