import { openDB } from 'idb';

const initdb = async () => {
  if (!window.indexedDB) {
    console.log("indexedDB is not supported.");
  } else {
    console.log("indexedDB is supported.");
  }

  openDB("todos", 1, {
    upgrade(db) {
      //it's to check if the indexDB created contains todos
      if (db.objectStoreNames.contains("todos")) {
        console.log("todos database already exists");
        return;
      }

      //if the todos does not exist
      //every element in the db has to have a unique key.
      db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
      console.log("todos database created");
    },
  });
};

const createStore = async (dbName, version, option) => {
  //create connection with the db with name dbName
  const db = await openDB(dbName, version);
  //create a transaction and specify the db and data privileges
  const tx = db.transaction(dbName, option);
  //open up the desired object store
  return tx.objectStore(dbName);
};

export const postDB = async (content) => {
  console.log("Post data to idb");

  const store = await createStore("todos", 1, "readwrite");

  //use the .add() method on the store and pass in the content
  const request = store.add({ todo: content });

  //get confirmation of the request.
  const result = await request;
  console.log("Data saved: ", result);
};

export const getAllDB = async () => {
  console.log("Get all from the idb");

  const store = await createStore("todos", 1, "readonly");

  const request = store.getAll();

  const results = await request;

  results.forEach((result) => {
    console.log("Data got: ", result);
  });

  return results;
};

export const getOneDB = async (id) => {
  console.log("Get one from the idb");

  const store = await createStore("todos", 1, "readonly");

  const request = store.get(id);

  const result = await request;
  console.log("Data got: ", result);
  return result;
};

initdb();
