import { Routes, Route } from 'react-router-dom';

import Spreadsheet from './components/Spreadsheet';
import { Paths } from './enums/Paths.enum';
import SpreadsheetCreator from './components/SpreadsheetCreator';

const App = () => (
  <div>
    <Routes>
      <Route path={Paths.Home} element={<SpreadsheetCreator />} />
      <Route path={Paths.Spreadsheet} element={<Spreadsheet />} />
    </Routes>
  </div>
);

export default App;
