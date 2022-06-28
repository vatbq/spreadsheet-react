const generateRows = (rows, callback) => Array(rows)
  .fill(0)
  .map((_, row) => callback(row));

export default generateRows;
