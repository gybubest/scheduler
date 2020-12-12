import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setHistory(prev => [...prev, mode]);
      setMode(newMode);
    }

  };

  function back() {
    const length = history.length;
    const lastHistoryState = history[length - 1];
    const backHistory = [...history.slice(0, length - 1)];
    if (length >= 1) {
      setMode(lastHistoryState);
      setHistory(backHistory)
    }
  };

  return { mode, transition, back };

};