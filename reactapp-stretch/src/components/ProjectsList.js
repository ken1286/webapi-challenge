import React from 'react';
import { Link } from 'react-router-dom';

class ProjectsList extends React.Component {

  render() {

    return ( 
      <div>
        {this.props.projects.map( (project, index) => {
          return (
            <div key={project.id}>
              <Link to={`/${project.id}`} >
                <h3>Project {index+1}</h3>
                <h4>{project.name}</h4>
              </Link>
            </div>
          )
        })}

      </div>
     );
  }
}
 
export default ProjectsList;