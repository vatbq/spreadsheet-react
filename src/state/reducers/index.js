/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { saveCellValue } from '../actionCreators';

export const initialState = {
  spreadsheets: {},
};

const persistConfig = {
  key: 'spreadsheets',
  storage,
};

const thereIsCircularReference = (originalKey, originalValue, state) => {
  const stack = [{ ref: originalValue }];

  while (stack.length) {
    const { ref } = stack.pop();

    if (ref === originalKey) {
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
    // eslint-disable-next-line comma-dangle
    ({ reference }) => reference === key
  );

  if (cellsToUpdate.length) {
    cellsToUpdate.forEach(
      ({ cellKey: newKey }) => (state.cells = updateCells(state, newKey, value))
    );
  }

  state.cells[key].value = value;

  return state.cells;
};

const spreadsheetsReducer = persistReducer(
  persistConfig,
  createReducer(initialState, {
    [saveCellValue]: (state, { payload }) => {
      const { spreadsheet, value, cellKey, isReference } = payload;
      if (!state.spreadsheets[spreadsheet]) {
        state.spreadsheets[spreadsheet] = {
          cells: {},
          error: null,
        };
      }

      const currentSpreadsheet = state.spreadsheets[spreadsheet];
      currentSpreadsheet.error = null;

      const circularReference = thereIsCircularReference(
        cellKey,
        value,
        currentSpreadsheet
      );

      if (circularReference) {
        currentSpreadsheet.error = 'Circular reference detected';
        return state;
      }

      if (isReference) {
        const newValue = currentSpreadsheet.cells[value]?.value;

        currentSpreadsheet.cells[cellKey] = {
          value: newValue,
          cellKey,
          reference: value,
        };

        currentSpreadsheet.cells = {
          ...updateCells(currentSpreadsheet, cellKey, newValue),
        };
      } else {
        currentSpreadsheet.cells[cellKey] = {
          value,
          cellKey,
          reference: null,
        };

        currentSpreadsheet.cells = {
          ...updateCells(state.spreadsheets[spreadsheet], cellKey, value),
        };
      }
    },
  })
);

export default spreadsheetsReducer;
