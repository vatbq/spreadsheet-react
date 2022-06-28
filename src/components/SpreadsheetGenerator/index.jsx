import React from 'react';
import PropTypes from 'prop-types';

import generateRows from '../../utils/generateRows';
import calculateColumnLetter from '../../utils/calculateColumnLetter';
import Cell from '../Cell';
import { COLUMNS_COUNT, ROW_COUNT } from '../../constants';

import classes from './SpreadsheetGenerator.module.scss';

const SpreadsheetGenerator = ({ spreadsheetId }) =>
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
        <Cell key={cellName} spreadsheet={spreadsheetId} cellKey={cellName} />
      );
    })
  );

SpreadsheetGenerator.propTypes = {
  spreadsheetId: PropTypes.string.isRequired,
};

export default SpreadsheetGenerator;
