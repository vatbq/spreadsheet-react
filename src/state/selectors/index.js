import { createSelector } from "@reduxjs/toolkit";

const selectCells = (state) => state.cells;

export const selectCellValue = createSelector(
  selectCells,
  (_, key) => key,
  (cells, key) => (cells[key] ? cells[key].value : "")
);
