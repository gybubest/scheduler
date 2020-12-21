import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // Shows transition to a new mode: Saving, Deleting or Error...
  function transition(newMode, replace = false) {
    // Replace lastHistoryState(s) in case of Error, so as to transition back without the middle states 
    // CREATE->ERROR_SAVE instead of CREATE->SAVING->ERROR_SAVE: 
    // SHOW->ERROR_DELETE instead of SHOW->CONFIRM->DELETING->ERROR_DELETE

    if (replace) {
      setMode(newMode);
    } else {
      setHistory((prev) => [...prev, mode]);
      setMode(newMode);
    }
  };

  // Transition back to the previous mode in the history
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