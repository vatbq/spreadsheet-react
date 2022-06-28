import { saveCellValue } from '../actionCreators';

export const saveCell = ({
  spreadsheet,
  cellKey,
  value,
  isReference = false,
}) =>
  saveCellValue({
    spreadsheet,
    cellKey,
    value,
    isReference,
  });
