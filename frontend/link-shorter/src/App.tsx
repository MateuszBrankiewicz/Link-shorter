import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
                                                                                                                              