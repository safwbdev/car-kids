import React from 'react';
import './App.scss';
import Navbar from './components/Navbar'
import Item from './components/Item'
import Home from './components/Home'
import Edit from './components/Edit'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from '@material-ui/core';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container>
        <Route path="/" exact component={Home} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/item/:id" component={Item} />
      </Container>
    </Router>
  );
}

export default App;
