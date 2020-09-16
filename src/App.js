import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskListTable from './components/TaskListTable';

class App extends Component {
 // constructor(props) {
   // super(props)
 // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <TaskListTable />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
