// src/shared_state/searchState.js
import { atom } from 'recoil';

// Define a Recoil Atom that represents a global state that can be shared
export const searchResultsState = atom({
  key: 'searchResultsState', // Unique identifier
  default: [], // Default value, you can adjust as needed
});
