import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
                                                                                                                              