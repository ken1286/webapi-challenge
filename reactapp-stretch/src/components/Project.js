import React from 'react';

const Project = props => {

  const project = props.projects.find( project => `${project.id}` === props.match.params.id);

  return ( 
    <div>
      <h1>{project.name}</h1>
      <h3>{project.description}</h3>
    </div>
   );
}
 
export default Project;