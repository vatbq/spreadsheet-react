/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { saveCellValue } from "../actionCreators";

export const initialState = {
  cells: {},
  error: null,
};

const persistConfig = {
  key: "spreadsheet",
  storage,
  blacklist: ["erro"],
};

const thereIsCircularReference = (originalKey, originalValue, state) => {
  const stack = [{ ref: originalValue }];

  while (stack.length) {
    const { ref } = stack.pop();

    if (ref == originalKey) {
      return true;
    }

    if (state.cells[ref]) {
      const cell = state.cells[ref];
      stack.push({ ref: cell.reference });
    }
  }

  return false;
};

const updateCells = (state, key, value) => {
  const cellsToUpdate = Object.values(state.cells).filter(
    ({ reference }) => reference == key
  );

  if (cellsToUpdate.length) {
    cellsToUpdate.forEach(
      ({ key: newKey }) => (state.cells = updateCells(state, newKey, value))
    );
  }

  state.cells[key].value = value;

  return state.cells;
};

const spreadsheetReducer = persistReducer(
  persistConfig,
  createReducer(initialState, {
    [saveCellValue]: (state, { payload }) => {
      const { value, key, isReference } = payload;

      const circularReference = thereIsCircularReference(key, value, state);

      if (circularReference) {
        state.error = "Circular reference detected";
        console.log("error", state.error);
        return state;
      }

      state.error = null;

      if (isReference) {
        const newValue = state.cells[value]?.value;

        state.cells[key] = {
          value: newValue,
          key,
          reference: value,
        };

        state.cells = { ...updateCells(state, key, newValue) };
      } else {
        state.cells[key] = {
          value,
          key,
          reference: null,
        };

        state.cells = { ...updateCells(state, key, value) };
      }
    },
  })
);

export default spreadsheetReducer;
