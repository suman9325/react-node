import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Signup } from './page/auth/Signup';
import { AddUpdateUser } from './page/dashboard/users/AddUpdateUser';

function App() {
  return (
    <div>
      {/* <Signup /> */}
      <AddUpdateUser />
    </div>
  );
}

export default App;
