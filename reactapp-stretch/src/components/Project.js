import React from 'react';
import axios from 'axios';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      actions: []
    }
  }

  componentDidMount() {
    const project = this.props.projects.find( project => `${project.id}` === this.props.match.params.id);

    axios
      .get(`http://localhost:4000/api/projects/${project.id}/actions`)
      .then(res => {
        this.setState({
          actions: res.data.actions
        })
      })
      .catch(err => {
        console.log(err);
      })


    this.setState({
      project: project
    })
  }

  render() {
    console.log(this.state)
    return ( 
      <div>
        <h1>{this.state.project.name}</h1>
        <h3>{this.state.project.description}</h3>
        <div>
        <h5>Actions</h5>
          {this.state.actions.map(action => {
            return (
                <p>{action.description}</p>
            )
          })}
        </div>
      </div>
   );
  }
}
 
export default Project;