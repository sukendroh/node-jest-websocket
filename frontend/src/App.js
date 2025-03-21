import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderComponent from './OrderComponent';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main route */}
        <Route path="/" element={<OrderComponent />} />

        {/* Fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
