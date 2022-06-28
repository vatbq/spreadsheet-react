const updateCells = (state, key, value) => {
  const cellsToUpdate = Object.values(state.cells).filter(
    // eslint-disable-next-line comma-dangle
    ({ reference }) => reference === key
  );

  if (cellsToUpdate.length) {
    cellsToUpdate.forEach(
      ({ cellKey: newKey }) => (state.cells = updateCells(state, newKey, value))
    );
  }

  state.cells[key].value = value;

  return state.cells;
};

export default updateCells;
