import {
  createDoc,
  getDocsWithQuery,
  updateDocById,
  deleteDocById,
} from "./baseService";
import {doc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/config";

// CREATE VEHICLE
export const createVehicle = async (data, dealerId) => {
  return await createDoc("vehicles", {
    ...data,
    dealerId,
    createdAt: new Date(),
  });
};

// GET VEHICLES (SCOPED)
export const getVehicles = async (role, dealerId) => {
  if (role === "admin") {
    return await getDocsWithQuery("vehicles");
  }

  return await getDocsWithQuery("vehicles", [
    where("dealerId", "==", dealerId),
  ]);
};

// UPDATE
export const updateVehicle = async (id, data) => {
  return await updateDocById("vehicles", id, data);
};

// DELETE
export const deleteVehicle = async (id) => {
  return await deleteDocById("vehicles", id);
};

export const assignVehicleToDriver = async (vehicleId, driverId) => {
  const ref = doc(db, "vehicles", vehicleId);

  await updateDoc(ref, {
    assignedDriverId: driverId,
  });
};