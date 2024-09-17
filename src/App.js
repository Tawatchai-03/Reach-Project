import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Adminlogin from './components/Adminlogin';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/adminlogin' element={<Adminlogin />}/>
        <Route path='/addEmployee' element={<AddEmployee />}/>
        <Route path='/employeeList' element={<EmployeeList />}/>
      </Routes>
    </Router>
  );
}

export default App;
