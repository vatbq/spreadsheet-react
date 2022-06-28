import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { shallowEqual, useSelector } from 'react-redux';

import { selectSpreadsheetError } from '../../state/selectors';
import SpreadsheetGenerator from '../SpreadsheetGenerator';
import ColumnsGenerator from '../ColumnsGenerator';

import classes from './Spreadsheet.module.scss';

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
        <div className={classes.headerColumns}>
          <ColumnsGenerator />
        </div>
        <div className={classes.content}>
          <SpreadsheetGenerator spreadsheetId={id} />
        </div>
      </div>
    )
  );
};

export default Spreadsheet;
