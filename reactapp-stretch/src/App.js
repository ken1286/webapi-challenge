import React from 'react';
import ProjectsList from './components/ProjectsList';
import './App.css';
import { Route } from 'react-router-dom';
import Project from './components/Project';
import axios from 'axios';

class App extends React.Component {
  state = {
    projectsList: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/projects')
      .then(res => {
        console.log(res.data);
        this.setState({
          projectsList: res.data.projects
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
     
    if(this.state.projectsList.length === 0) {
      return <h3>No projects available</h3>
    }

    return (
      <div className="App">
        
        <Route
          exact
          path='/'
          render={props => (
            <ProjectsList 
              {...props} 
              projects={this.state.projectsList}
            />
          )}
        />

        <Route 
          path='/:id' 
          render={props => (
            <Project 
              {...props} 
              projects={this.state.projectsList}
            />
          )}
        />
      </div>
    );
  }
}

export default App;