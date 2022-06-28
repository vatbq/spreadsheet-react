import generateRows from '../../utils/generateRows';
import calculateColumnLetter from '../../utils/calculateColumnLetter';
import { COLUMNS_COUNT } from '../../constants';

import classes from './ColumnsGenerator.module.scss';

const ColumnsGenerator = () =>
  generateRows(COLUMNS_COUNT, (column) => {
    if (column === 0) {
      return <div key="emptyCell" className={classes.emptyCell} />;
    }

    const letter = calculateColumnLetter(column);

    return (
      <div className={classes.headerColumn} key={letter}>
        {letter}
      </div>
    );
  });

export default ColumnsGenerator;
