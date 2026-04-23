import {
  createDoc,
  getDocsWithQuery,
  updateDocById,
  deleteDocById,
} from "./baseService";

export const createDealer = async (data) => {
  return await createDoc("dealers", {
    ...data,
    createdAt: new Date(),
  });
};

export const getDealers = async () => {
  return await getDocsWithQuery("dealers");
};

export const updateDealer = async (id, data) => {
  return await updateDocById("dealers", id, data);
};

export const deleteDealer = async (id) => {
  return await deleteDocById("dealers", id);
};