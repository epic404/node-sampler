const { dataService } = require('../services');

module.exports = {
  getObject,
  putObject,
  deleteObject
};

async function getObject(req, res) {
  const repo = req.params.repository;
  const objectId = req.params.objectId;

  try {
    const object = await dataService.getItem(repo, objectId);
    res.status(200).json(object);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function putObject(req, res) {
  const repo = req.params.repository;
  const data = req.body;

  try {
    const newObject = await dataService.addItem(repo, data);
    res.status(201).json(newObject);
  } catch (err) {
    res.sendStatus(err || 500);
  }
}

async function deleteObject(req, res) {
  const repo = req.params.repository;
  const objectId = req.params.objectId;

  try {
    await dataService.deleteItem(repo, objectId);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
}