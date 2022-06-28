/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thereIsCircularReference from '../../services/thereIsCircularReference';
import updateCells from '../../services/updateCells';

import { saveCellValue, saveSpreadsheet } from '../actionCreators';

export const initialState = {
  spreadsheets: {},
  justCreatedSpreadsheet: null,
};

const persistConfig = {
  key: 'spreadsheets',
  storage,
};

const spreadsheetsReducer = persistReducer(
  persistConfig,
  createReducer(initialState, {
    [saveSpreadsheet]: (state, { payload }) => {
      const { spreadsheet } = payload;
      state.spreadsheets[spreadsheet] = {
        cells: {},
        error: null,
      };

      state.justCreatedSpreadsheet = spreadsheet;
    },
    [saveCellValue]: (state, { payload }) => {
      state.justCreatedSpreadsheet = null;

      const { spreadsheet, value, cellKey, isReference } = payload;

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
