import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// CREATE
export const createDoc = async (collectionName, data) => {
  return await addDoc(collection(db, collectionName), data);
};

// READ (with optional filters)
export const getDocsWithQuery = async (collectionName, conditions = []) => {
  let q = collection(db, collectionName);

  if (conditions.length) {
    q = query(q, ...conditions);
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// UPDATE
export const updateDocById = async (collectionName, id, data) => {
  const ref = doc(db, collectionName, id);
  return await updateDoc(ref, data);
};

// DELETE
export const deleteDocById = async (collectionName, id) => {
  const ref = doc(db, collectionName, id);
  return await deleteDoc(ref);
};