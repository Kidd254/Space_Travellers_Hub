import { Routes, Route } from 'react-router-dom';
import Rockets from './views/Rockets';
import Missions from './views/Missions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Rockets />} />
      <Route path="rockets" element={<Rockets />} />
      <Route path="missions" element={<Missions />} />
    </Routes>
  );
}

export default App;
