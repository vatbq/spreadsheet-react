/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { saveCell } from '../../state/actions';
import { selectCellValue } from '../../state/selectors';
import { IS_REFERENCE_REGEX } from '../../constants';

import classes from './Cell.module.scss';

const Cell = ({ spreadsheet, cellKey }) => {
  const dispatch = useDispatch();

  const cellValue = useSelector(
    (state) => selectCellValue(state, spreadsheet, cellKey),
    shallowEqual
  );

  const [currentValue, setCurrentValue] = useState(cellValue);

  const handleCellChangeValue = useCallback(
    (inputValue) => {
      if (IS_REFERENCE_REGEX.test(inputValue)) {
        dispatch(
          saveCell({
            spreadsheet,
            cellKey,
            value: inputValue.substring(1),
            isReference: true,
          })
        );
      } else {
        dispatch(saveCell({ spreadsheet, cellKey, value: inputValue }));
      }
    },
    [spreadsheet, cellKey]
  );

  const onCellChange = useCallback((e) => {
    const inputValue = e.target.value;
    setCurrentValue(inputValue);
    handleCellChangeValue(inputValue);
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
