import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { shallowEqual, useSelector } from 'react-redux';

import Cell from '../Cell';
import calculateColumnLetter from '../../utils/calculateColumnLetter';
import generateRows from '../../utils/generateRows';
import { COLUMNS_COUNT, ROW_COUNT } from '../../constants';
import { selectSpreadsheetError } from '../../state/selectors';

import classes from './Spreadsheet.module.scss';

const generateSpreadsheet = (spreadsheet) =>
  generateRows(ROW_COUNT, (row) =>
    generateRows(COLUMNS_COUNT, (column) => {
      if (column === 0) {
        return (
          <div key={`row-${row + 1}`} className={classes.headerRow}>
            {row + 1}
          </div>
        );
      }

      const columnName = calculateColumnLetter(column);
      const cellName = `${columnName}${row + 1}`;

      return (
        <Cell key={cellName} spreadsheet={spreadsheet} cellKey={cellName} />
      );
    })
  );

const generateColumns = () =>
  generateRows(COLUMNS_COUNT, (index) => {
    if (index === 0) {
      return <div key="emptyCell" className={classes.emptyCell} />;
    }

    const letter = calculateColumnLetter(index);

    return (
      <div className={classes.headerColumn} key={letter}>
        {letter}
      </div>
    );
  });

const Spreadsheet = () => {
  const { id } = useParams();

  const errorMessage = useSelector(
    (state) => selectSpreadsheetError(state, id),
    shallowEqual
  );

  return (
    id && (
      <div className={classes.container}>
        {errorMessage && (
          <Alert className={classes.alert} severity="error">
            {errorMessage}
          </Alert>
        )}
        <div className={classes.headerColumns}>{generateColumns()}</div>
        <div className={classes.content}>{generateSpreadsheet(id)}</div>
      </div>
    )
  );
};

export default Spreadsheet;
