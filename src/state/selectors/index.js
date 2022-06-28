/* eslint-disable implicit-arrow-linebreak */
import { createSelector } from '@reduxjs/toolkit';

const selectSpreadsheets = (state) => state.spreadsheets;
export const selectJustCreatedSpreadsheet = (state) =>
  state.justCreatedSpreadsheet;

export const selectCellValue = createSelector(
  selectSpreadsheets,
  (_, spreadsheetId) => spreadsheetId,
  (_, __, cellKey) => cellKey,
  (spreadsheets, spreadsheetId, cellKey) =>
    spreadsheets[spreadsheetId]?.cells[cellKey]?.value || ''
);

export const selectSpreadsheetError = createSelector(
  selectSpreadsheets,
  (_, spreadsheetId) => spreadsheetId,
  (spreadsheets, spreadsheetId) => spreadsheets[spreadsheetId]?.error
);
