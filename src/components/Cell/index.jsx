/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { saveCell } from '../../state/actions';
import { selectCellValue } from '../../state/selectors';
import { START_REFERENCE_SYMBOL } from '../../constants';

import classes from './Cell.module.scss';

const regex = /([A-Z]*[A-Z])([1-9]|[1-9][0-9]|100)\b/;

const Cell = ({ spreadsheet, cellKey }) => {
  const dispatch = useDispatch();

  const cellValue = useSelector(
    (state) => selectCellValue(state, spreadsheet, cellKey),
    shallowEqual
  );

  const [currentValue, setCurrentValue] = useState(cellValue);

  const handleCellChangeValue = useCallback((inputValue) => {
    if (inputValue[0] === START_REFERENCE_SYMBOL) {
      const values = inputValue.split(START_REFERENCE_SYMBOL);
      const reference = values[1];

      if (regex.test(reference)) {
        dispatch(
          saveCell({
            spreadsheet,
            cellKey,
            value: reference,
            isReference: true,
          })
        );
      } else {
        dispatch(saveCell({ spreadsheet, cellKey, value: inputValue }));
      }
    } else {
      dispatch(saveCell({ spreadsheet, cellKey, value: inputValue }));
    }
  }, []);

  const onCellChange = useCallback((e) => {
    setCurrentValue(e.target.value);
    handleCellChangeValue(e.target.value);
  }, []);

  useEffect(() => {
    if (cellValue) {
      setCurrentValue(cellValue);
    }
  }, [cellValue]);

  return (
    <input
      className={classes.cell}
      onChange={onCellChange}
      value={currentValue}
    />
  );
};

Cell.propTypes = {
  cellKey: PropTypes.string.isRequired,
  spreadsheet: PropTypes.string.isRequired,
};

export default Cell;
