const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const { request } = require("express");
const { isUuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repository = {
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryUpdate = repositories.find(repository => repository.id === id);
  if (repositoryUpdate === undefined)
     return response.status(400).json();

  const { likes } = repositoryUpdate;
  const repositoryUpdated = {
     id,
     title,
     url,
     techs,
     likes,
  };

  repositoryUpdateIndex = repositories.indexOf(repositoryUpdate);
  repositories[repositoryUpdateIndex] = repositoryUpdated;

  return response.status(200).json(repositoryUpdated);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).send();
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if(!repository){
    return response.status(400).send();
  }

  repository.likes ++;

  return response.json(repository);
});

module.exports = app;
