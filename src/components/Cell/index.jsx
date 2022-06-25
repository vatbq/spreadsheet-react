import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import { saveCell } from "../../state/actions";
import { selectCellValue } from "../../state/selectors";

import classes from "./Cell.module.scss";

const regex = new RegExp(/([A-Z]*[A-Z])([1-9]|[1-9][0-9]|100)\b/);

const Cell = ({ cellKey }) => {
  const cellValue = useSelector(
    (state) => selectCellValue(state, cellKey),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [currentValue, setCurrentValue] = useState(cellValue);

  const handleCellChangeValue = useCallback((inputValue) => {
    if (inputValue[0] == "=") {
      const values = inputValue.split("=");
      const reference = values[1];

      if (regex.test(reference)) {
        dispatch(saveCell(cellKey, reference, true));
      }
    } else {
      dispatch(saveCell(cellKey, inputValue));
    }
  }, []);

  const debouncedHandleCellChangeValue = useCallback(
    debounce(handleCellChangeValue, 300),
    []
  );

  const onCellChange = useCallback((e) => {
    setCurrentValue(e.target.value);
    debouncedHandleCellChangeValue(e.target.value);
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
};

export default Cell;
