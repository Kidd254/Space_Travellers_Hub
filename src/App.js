import { Routes, Route } from 'react-router-dom';
import Rockets from './views/Rockets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Rockets />} />
    </Routes>
  );
}

export default App;
