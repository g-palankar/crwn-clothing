import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

const Hats = () => (<div>
  <h1>The Hats page</h1>
</div>)

function App() {
  return (
    <div>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/hats' component={Hats}></Route>
    </div>
  );
}

export default App;
