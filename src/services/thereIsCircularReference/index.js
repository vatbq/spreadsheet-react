const thereIsCircularReference = (originalKey, originalValue, state) => {
  const stack = [{ ref: originalValue }];

  while (stack.length) {
    const { ref } = stack.pop();

    if (ref === originalKey) {
      return true;
    }

    if (state.cells[ref]) {
      const cell = state.cells[ref];
      stack.push({ ref: cell.reference });
    }
  }

  return false;
};

export default thereIsCircularReference;
