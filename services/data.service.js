const { v4: uuidv4 } = require('uuid');
let db = {};

module.exports = {
  getItem,
  addItem,
  deleteItem
};

function getItem(collection, itemId) {
  return new Promise((resolve, reject) => {
    const itemCollection = db[collection] || [];
    const item = itemCollection.find((obj) => obj.oid === itemId);

    if (item) {
      resolve(getResponseItem(item));
    } else {
      reject();
    }
  });
}

function addItem(collection, data) {
  return new Promise((resolve, reject) => {
    const itemCollection = db[collection] || [];
    const item = itemCollection.find((obj) => obj.name === data.name);

    // NOTE: The service should de-duplicate data objects by repository.
    if (item) {
      reject(403);
    } else {
      const newItem = {
        ...data,
        size: 1,
        oid: uuidv4()
      };

      db[collection] = [ ...itemCollection, newItem ];

      resolve(newItem);
    }
  });
} 

function deleteItem(collection, itemId) {
  return new Promise((resolve, reject) => {
    const itemCollection = db[collection] || [];
    const item = itemCollection.find((obj) => obj.oid === itemId);

    if (item) {
      const updatedCollection = itemCollection.filter((obj) => obj.oid !== itemId);
      db[collection] = [ ...updatedCollection ];

      resolve(getResponseItem(item));
    } else {
      reject();
    }
  });
}

function getResponseItem(item) {
  let returnItem = { ...item };
  delete returnItem.oid;
  delete returnItem.size;

  return returnItem;
}