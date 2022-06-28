import { Routes, Route } from 'react-router-dom';

import Spreadsheet from './components/Spreadsheet';
import { Paths } from './enums/Paths.enum';

import classes from './App.scss';
import Home from './components/Home';

const App = () => (
  <div className={classes.app}>
    <Routes>
      <Route path={Paths.Home} element={<Home />} />
      <Route path={Paths.Spreadsheet} element={<Spreadsheet />} />
    </Routes>
    <Spreadsheet />
  </div>
);

export default App;
