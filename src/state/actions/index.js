import { saveCellValue, saveSpreadsheet } from '../actionCreators';
import createSpreadsheetService from '../../services/createSpreadsheet';

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

export const createSpreadsheet = () => (dispatch) => {
  const spreadsheetId = createSpreadsheetService();

  return dispatch(
    saveSpreadsheet({
      spreadsheet: spreadsheetId,
    })
  );
};
