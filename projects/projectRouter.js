const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel.js');
const actionDb = require('../data/helpers/actionModel.js');

// CRUD

router.get('/', (req, res) => {

  projectDb.get()
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch( err => {
      res.status(500).json({ error: "Project information could not be retrieved."})
    })
});

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post('/', validateProject, (req, res) => {
  const newProject = req.body;

  projectDb.insert(newProject)
    .then( project => {
      res.status(200).json({ project });
    })
    .catch( err => {
      res.status(500).json({ error: "There was an error while saving the project to the database" })
    })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  const updatedProject = req.body;
  const { id } = req.params;

  projectDb.update(id, updatedProject)
    .then( project => {
      res.status(204).json({project});
    })
    .catch( err => {
      res.status(500).json({ message: 'Error updating project.' });
    })
});

router.get('/:id/actions', validateProjectId, (req, res) => {
  const { id } = req.params;

  projectDb.getProjectActions(id)
    .then( actions => {
      res.status(200).json({actions});
    })
    .catch( err => {
      res.status(500).json({ error: 'Could not access project actions.'});
    })
});

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
  const newAction = {...req.body, project_id: req.params.id};

  actionDb.insert(newAction)
    .then( action => {
      res.status(200).json({ action });
    })
    .catch( err => {
      res.status(500).json({ error: "There was an error while saving the action to the database" })
    })
});

router.delete('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;

  projectDb.remove(id)
    .then( project => {
      res.status(204).json({ project })
    })
    .catch( err => {
       res.status(500).json({ message: 'error' });
    })
});

// middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;

  projectDb.get(id)
    .then( project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "Project not found: Invalid ID." })
      }
    })
    .catch( err => {
      res.status(500).json({ message: 'Failed to process request.'})
    })
};

function validateProject(req, res, next) {
  const { name } = req.body;
  const { description } = req.body;
  if(!name || !description) {
    res.status(400).json({ message: 'Missing required field(s). Please include name and description.' });
  } else {
    next();
  }
};

function validateAction(req, res, next) {
  const { notes } = req.body;
  const { description } = req.body;
  if(!notes || !description) {
    res.status(400).json({ message: 'Missing required field(s). Please include notes and description.' });
  } else {
    next();
  }
};

module.exports = router;