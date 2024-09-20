import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Signup } from './page/auth/Signup';
import { AddUpdateUser } from './page/dashboard/users/AddUpdateUser';
import ListProjects from './page/dashboard/projects/ListProjects';

function App() {
  return (
    <div>
      {/* <Signup /> */}
      {/* <AddUpdateUser /> */}
      <ListProjects />
    </div>
  );
}

export default App;
