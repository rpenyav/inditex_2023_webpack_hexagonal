// database.js
import { openDB } from 'idb';

export const setupIndexedDB = async () => {
  const db = await openDB('podcastDatabase', 1, {
    upgrade(db) {
      db.createObjectStore('podcasts');
    },
  });
  return db;
};
