import { saveCellValue } from "../actionCreators";

export const saveCell = (key, value, isReference = false) =>
  saveCellValue({ key, value, isReference });
