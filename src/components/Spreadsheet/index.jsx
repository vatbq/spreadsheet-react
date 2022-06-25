// import PropTypes from "prop-types";

import Cell from "../Cell";
import calculateColumnLetter from "../../utils/calculateColumnLetter";
import generateRows from "../../utils/generateRows";

import classes from "./Spreadsheet.module.scss";

const COLUMNS_COUNT = 31;
const ROW_COUNT = 100;

const generateSpreadsheet = () =>
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

      return <Cell key={cellName} cellKey={cellName} />;
    })
  );

const generateColumns = () =>
  generateRows(COLUMNS_COUNT, (index) => {
    if (index == 0) {
      return <div key="emptyCell" className={classes.emptyCell} />;
    }

    const letter = calculateColumnLetter(index);

    return (
      <div className={classes.headerColumn} key={letter}>
        {letter}
      </div>
    );
  });

const Spreadsheet = () => (
  <div className={classes.container}>
    <div className={classes.headerColumns}>{generateColumns()}</div>
    <div className={classes.content}>{generateSpreadsheet()}</div>
  </div>
);

Spreadsheet.propTypes = {};

export default Spreadsheet;
