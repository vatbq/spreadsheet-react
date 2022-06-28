import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { selectJustCreatedSpreadsheet } from '../../state/selectors';
import { createSpreadsheet } from '../../state/actions';
import { SPREADSHEET_BASE_PATH } from '../../constants';

const SpreadsheetCreator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(createSpreadsheet());
  }, []);

  const createdSpreadsheetId = useSelector(
    selectJustCreatedSpreadsheet,
    shallowEqual
  );

  useEffect(() => {
    if (createdSpreadsheetId) {
      navigate(`${SPREADSHEET_BASE_PATH}/${createdSpreadsheetId}`);
    }
  }, [createdSpreadsheetId]);

  return null;
};

export default SpreadsheetCreator;
