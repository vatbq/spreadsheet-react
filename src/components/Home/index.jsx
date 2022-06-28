import { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { SPREADSHEET_BASE_PATH } from '../../constants';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const uuid = uuidv4();
    navigate(`${SPREADSHEET_BASE_PATH}/${uuid}`);
  }, []);

  return null;
};

export default Home;
